import { TaskService } from '../services/taskService.js';
import { TASK_PRIORITY, TASK_STATUS } from '../models/taskConsts.js';

const taskService = new TaskService();


class TaskController {
  #validateId(id) {
    if (!Number.isInteger(id) || id <= 0) {
      return { status: 400, data: { error: 'Invalid id' } };
    }
    return null;
  }

  #validateStatus(data) {
    if (data.status) {
      data.status = data.status.toString().toUpperCase();
      if (!Object.values(TASK_STATUS).includes(data.status)) {
        return { status: 400, data: { error: `Invalid status. Allowed values: ${Object.values(TASK_STATUS).join(', ')}` } };
      }
    }
    return null;
  }

  #normalizePriority(data) {
    if (data.priority) {
      data.priority = data.priority.toString().toUpperCase();
      if (!Object.values(TASK_PRIORITY).includes(data.priority)) {
        return { status: 400, data: { error: `Invalid priority. Allowed values: ${Object.values(TASK_PRIORITY).join(', ')}` } };
      }
    }
    return null;
  }

  getAll() {
    try {
      const tasks = taskService.getAll();
      return { status: 200, data: tasks };
    } catch (err) {
      return { status: 500, data: { error: err.message } };
    }
  }

  getById(id) {
    const idError = this.#validateId(id);
    if (idError) return idError;
    try {
      const task = taskService.getById(id);
      return { status: 200, data: task };
    } catch (err) {
      if (err.message === 'Task not found') {
        return { status: 404, data: { error: err.message } };
      }
      return { status: 500, data: { error: err.message } };
    }
  }

  create(data) {
    if (!data.title || data.title.length < 3) {
      return { status: 400, data: { error: 'Title is required and must be at least 3 characters' } };
    }
    if (data.dueDate && isNaN(new Date(data.dueDate).getTime())) {
      return { status: 400, data: { error: 'Due date is invalid' } };
    }
    const statusError = this.#validateStatus(data);
    if (statusError) return statusError;
    const priorityError = this.#normalizePriority(data);
    if (priorityError) return priorityError;
    try {
      const task = taskService.create(data);
      return { status: 201, data: task };
    } catch (err) {
      return { status: 400, data: { error: err.message } };
    }
  }

  update(id, data) {
    const idError = this.#validateId(id);
    if (idError) return idError;
    if (data.title && data.title.length < 3) {
      return { status: 400, data: { error: 'Title must be at least 3 characters' } };
    }
    if (data.createdAt) {
      return { status: 400, data: { error: 'createdAt cannot be modified' } };
    }
    if (data.dueDate && isNaN(new Date(data.dueDate).getTime())) {
      return { status: 400, data: { error: 'Due date is invalid' } };
    }
    const statusError = this.#validateStatus(data);
    if (statusError) return statusError;
    const priorityError = this.#normalizePriority(data);
    if (priorityError) return priorityError;
    try {
      const task = taskService.update(id, data);
      return { status: 200, data: task };
    } catch (err) {
      if (err.message === 'Task not found') {
        return { status: 404, data: { error: err.message } };
      }
      return { status: 400, data: { error: err.message } };
    }
  }

  delete(id) {
    const idError = this.#validateId(id);
    if (idError) return idError;
    try {
      taskService.delete(id);
      return { status: 204, data: null };
    } catch (err) {
      if (err.message === 'Task not found') {
        return { status: 404, data: { error: err.message } };
      }
      return { status: 500, data: { error: err.message } };
    }
  }
}

const taskController = new TaskController();
export default taskController;
