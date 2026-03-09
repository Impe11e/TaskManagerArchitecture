import {TaskService} from '../services/taskService.js';
import {TASK_PRIORITY, TASK_STATUS} from '../models/taskConsts.js';
import {ValidationError} from "../errors/customErrors.js";
import handle from "../errors/errorHandler.js";

const taskService = new TaskService();


class TaskController {
    #validateId(id) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new ValidationError('Invalid id')
        }
        return null;
    }

    #validateStatus(data) {
        if (data.status) {
            data.status = data.status.toString().toUpperCase();
            if (!Object.values(TASK_STATUS).includes(data.status)) {
                throw new ValidationError(`Invalid status. Allowed values: ${Object.values(TASK_STATUS).join(', ')}`)
            }
        }
        return null;
    }

    #normalizePriority(data) {
        if (data.priority) {
            data.priority = data.priority.toString().toUpperCase();
            if (!Object.values(TASK_PRIORITY).includes(data.priority)) {
                throw new ValidationError(`Invalid priority. Allowed values: ${Object.values(TASK_PRIORITY).join(', ')}`)
            }
        }
        return null;
    }

    getAll() {
        try {
            const tasks = taskService.getAll();
            return {status: 200, data: tasks};
        } catch (err) {
            return handle(err)//
        }
    }

    getById(id) {
        try {
        const idError = this.#validateId(id);
        if (idError) return idError;
            const task = taskService.getById(id);
            return {status: 200, data: task};
        } catch (err) {
            //if (err.message === 'Task not found') {
            //return { status: 404, data: { error: err.message } };
            //}
            //return { status: 500, data: { error: err.message } };
            return handle(err)
        }
    }

    create(data) {
        try {
        if (!data.title || data.title.length < 3) {
            throw new ValidationError('Title is required and must be at least 3 characters')
        }
        if (data.dueDate && isNaN(new Date(data.dueDate).getTime())) {
            throw new ValidationError('Due date is invalid')
        }
        const statusError = this.#validateStatus(data);
        if (statusError) return statusError;
        const priorityError = this.#normalizePriority(data);
        if (priorityError) return priorityError;
            const task = taskService.create(data);
            return {status: 201, data: task};
        } catch (err) {
           return handle(err)
        }
    }

    update(id, data) {
        try {
        const idError = this.#validateId(id);
        if (idError) return idError;
        if (data.title && data.title.length < 3) {
            throw new ValidationError('Title must be at least 3 characters')
        }
        if (data.createdAt) {
            throw new ValidationError('createdAt cannot be modified')
        }
        if (data.dueDate && isNaN(new Date(data.dueDate).getTime())) {
            throw new ValidationError('Due date is invalid')
        }
        const statusError = this.#validateStatus(data);
        if (statusError) return statusError;
        const priorityError = this.#normalizePriority(data);
        if (priorityError) return priorityError;
            const task = taskService.update(id, data);
            return {status: 200, data: task};
        } catch (err) {
            return handle(err)
        }
    }

    delete(id) {
        try {
        const idError = this.#validateId(id);
        if (idError) return idError;
            taskService.delete(id);
            return {status: 204, data: null};
        } catch (err) {
            return handle(err)
        }
    }
}

const taskController = new TaskController();
export default taskController;
