import { TaskPriority, TaskStatus, TASK_PRIORITY, TASK_STATUS } from '../../constants/tasks/taskConsts.js';
import { InvariantError } from '../../errors/domainErrors.js';

export interface TaskProps {
  id?: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date;
  createdAt?: Date;
}

export class TaskEntity {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date | null;
  createdAt: Date;

  constructor({ id, title, description, status, priority, dueDate, createdAt }: TaskProps) {
    if (!title || title.trim().length < 3) {
      throw new InvariantError('Title must be at least 3 chars.');
    }
    if (description && description.length > 1000) {
      throw new InvariantError('Description is too long (max 1000 characters).');
    }
    if (status && !Object.values(TASK_STATUS).includes(status)) {
      throw new InvariantError(`Invalid status: ${status}`);
    }
    if (priority && !Object.values(TASK_PRIORITY).includes(priority)) {
      throw new InvariantError(`Invalid priority: ${priority}`);
    }
    this.id = id;
    this.title = title.trim();
    this.description = description || '';
    this.status = status || TASK_STATUS.NEW;
    this.priority = priority || TASK_PRIORITY.MEDIUM;
    this.dueDate = dueDate ? new Date(dueDate) : null;
    this.createdAt = createdAt || new Date();
  }

  isOverdue(): boolean {
    return !!this.dueDate && this.dueDate < new Date() && this.status !== TASK_STATUS.DONE;
  }

  isUrgent(): boolean {
    return this.priority === TASK_PRIORITY.HIGH && this.status !== TASK_STATUS.DONE;
  }

  complete(): void {
    this.status = TASK_STATUS.DONE;
  }

  changePriority(newPriority: TaskPriority): void {
    if (Object.values(TASK_PRIORITY).includes(newPriority)) {
      this.priority = newPriority;
    } else {
      throw new InvariantError(`Invalid priority: ${newPriority}`);
    }
  }
}
