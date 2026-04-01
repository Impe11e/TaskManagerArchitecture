import { TASK_PRIORITY, TASK_STATUS } from '../../constants/tasks/taskConsts.js';
import { InvariantError } from "../../errors/domainErrors.js";

export default class TaskEntity {
  constructor({ id, title, description, status, priority, dueDate, createdAt, userId}) {
    if (!title || title.trim().length < 3) {
      throw new InvariantError("Title must be at least 3 chars.");
    }
      
    if (description?.length > 1000) {
      throw new InvariantError("Description is too long (max 1000 characters).");
    }

    if (status && !Object.values(TASK_STATUS).includes(status)) {
      throw new InvariantError(`Invalid status: ${status}`);
    }

    if (priority && !Object.values(TASK_PRIORITY).includes(priority)) {
      throw new InvariantError(`Invalid priority: ${priority}`);
    }

    if (!userId || userId <= 0) {
      throw new InvariantError("User ID is required and must be valid.");
    }

    this.id = id;
    this.title = title.trim();
    this.description = description || "";
    this.status = status || TASK_STATUS.NEW;
    this.priority = priority || TASK_PRIORITY.MEDIUM;
    this.dueDate = dueDate ? new Date(dueDate) : null;
    this.createdAt = createdAt || new Date();
    this.userId = userId;
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
      throw new InvariantError(`Invalid priority: ${newPriority}`);
    }
  }
}