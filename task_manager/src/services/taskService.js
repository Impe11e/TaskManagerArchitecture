import { TaskRepository } from '../repositories/taskRepository.js';

const taskRepository = new TaskRepository();

export class TaskService {
  getAllTasks() {
    return taskRepository.getAll();
  }

  getTaskById(id) {
    const task = taskRepository.getById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  createTask(taskData) {
    if (!taskData.title || taskData.title.length < 3) {
      throw new Error('Title is required and must be at least 3 characters');
    }
    if (taskData.dueDate && new Date(taskData.dueDate) < new Date()) {
      throw new Error('Due date cannot be in the past');
    }
    // Normalize priority to match TASK_PRIORITY constants (e.g. 'MEDIUM')
    if (taskData.priority) {
      taskData.priority = taskData.priority.toString().toUpperCase();
    }
    return taskRepository.create(taskData);
  }

  updateTask(id, updatedData) {
    if (updatedData.title && updatedData.title.length < 3) {
      throw new Error('Title must be at least 3 characters');
    }
    if (updatedData.createdAt) {
      throw new Error("createdAt cannot be modified");
    }
    if (updatedData.dueDate) {
      const dueDate = new Date(updatedData.dueDate);

      if (dueDate < new Date()) {
        throw new Error("Due date cannot be in the past");
      }
    }
    // Normalize priority if provided
    if (updatedData.priority) {
      updatedData.priority = updatedData.priority.toString().toUpperCase();
    }
    const updatedTask = taskRepository.update(id, updatedData);
    if (!updatedTask) {
      throw new Error('Task not found');
    }
    return updatedTask;
  }

  deleteTask(id) {
    const deleted = taskRepository.delete(id);
    if (!deleted) {
      throw new Error('Task not found');
    }
    return deleted;
  }
}
