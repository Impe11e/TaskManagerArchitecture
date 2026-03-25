import { TASK_PRIORITY, TASK_STATUS } from '../constants/taskConsts.js';
import { ValidationError } from '../../errors/customErrors.js';

export default class TaskEntity {
  constructor({ id, title, description, status, priority, dueDate, createdAt}) {
    if (!title || title.trim().length < 3) {
      throw new ValidationError("Title must be at least 3 chars.");
    }
      
    if (description?.length > 1000) {
      throw new ValidationError("Description is too long (max 1000 characters).");
    }  

    this.id = id;
    this.title = title;
    this.description = description || "";
    this.status = status || TASK_STATUS.NEW;
    this.priority = priority || TASK_PRIORITY.MEDIUM;
    this.dueDate = dueDate ? new Date(dueDate) : null;
    this.createdAt = createdAt || new Date();
      // this.ownerId = ownerId;
      // this.projectId = project
  }

  isOverdue() {
    return this.dueDate && this.dueDate < new Date() && this.status !== TASK_STATUS.DONE;
  }

  isUrgent() {
    return this.priority === TASK_PRIORITY.HIGH && this.status !== TASK_STATUS.DONE;
  }

  complete() {
    this.status = TASK_STATUS.DONE;
  }

  changePriority(newPriority) {
    if (Object.values(TASK_PRIORITY).includes(newPriority)) {
      this.priority = newPriority;
    } else {
      throw new ValidationError(`Invalid priority: ${newPriority}`);
    }
  }
}