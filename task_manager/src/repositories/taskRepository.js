import Task from '../models/taskModel.js';

let tasks = new Map();
let nextId = 1;

export class TaskRepository {
  getAll() {
    return Array.from(tasks.values());
  }

  getById(id) {
    return tasks.get(id) || null;
  }

  create(taskData) {
    const id = nextId++;
    const task = new Task({
      id,
      ...taskData,
      createdAt: taskData.createdAt ?? new Date()
    });
    tasks.set(id, task);
    return task;
  }

  update(id, updatedData) {
    if (!tasks.has(id)) return null;
    const oldTask = tasks.get(id);
    const updatedTask = new Task({
      ...oldTask,
      ...updatedData,
      id: oldTask.id,
      createdAt: oldTask.createdAt
    });
    tasks.set(id, updatedTask);
    return updatedTask;
  }

  delete(id) {
    return tasks.delete(id);
  }
}