import { TaskRepository } from '../repositories/taskRepository.js';

const taskRepository = new TaskRepository();

export class TaskService {
  getAll() {
    return taskRepository.getAll();
  }

  #requireTask(id) {
    const task = taskRepository.getById(id);
    if (!task) throw new Error('Task not found');
    return task;
  }

  getById(id) {
    return this.#requireTask(id);
  }

  create(taskData) {
    if (taskData.dueDate && new Date(taskData.dueDate) < new Date()) {
      throw new Error('Due date cannot be in the past');
    }
    return taskRepository.create(taskData);
  }

  update(id, updatedData) {
    if (updatedData.dueDate && new Date(updatedData.dueDate) < new Date()) {
      throw new Error('Due date cannot be in the past');
    }
    this.#requireTask(id);
    const updatedTask = taskRepository.update(id, updatedData);
    return updatedTask;
  }

  delete(id) {
    this.#requireTask(id);
    return taskRepository.delete(id);
  }
}
