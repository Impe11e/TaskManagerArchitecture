import Task from '../model/taskModel.js';

let tasks = [];
let nextId = 1;

export class TaskRepository {
  getAll() {
    return tasks;
  }

  getById(id) {
    return tasks.find(task => task.id === id);
  }

  create(taskData) {
    const task = new Task({
      id: nextId++,
      ...taskData,
      createdAt: taskData.createdAt ?? new Date()
    });
    tasks.push(task);
    return task;
  }

  update(id, updatedData) {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return null;
    const oldTask = tasks[index];
    const updatedTask = new Task({
      ...oldTask,
      ...updatedData,
      id: oldTask.id,
      createdAt: oldTask.createdAt
    });
    tasks[index] = updatedTask;
    return updatedTask;
  }

  delete(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }
}