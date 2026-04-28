import { ValidationError } from '../../../errors/presentationErrors.js';
import {
  TASK_PRIORITY,
  TASK_STATUS,
  TaskPriority,
  TaskStatus
} from '../../../../domain/constants/tasks/taskConsts.js';

export interface CreateTaskInputDTOProps {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string | Date;
}

export class CreateTaskInputDTO {
  title: string;
  description: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string | Date;

  constructor(data: CreateTaskInputDTOProps) {
    this.title = data.title?.trim();
    this.description = data.description?.trim() || '';
    this.status = this.parseStatus(data.status);
    this.priority = this.parsePriority(data.priority);
    this.dueDate = data.dueDate ? new Date(data.dueDate) : undefined;
    this.validate();
    Object.freeze(this);
  }

  private parseStatus(status?: string): TaskStatus | undefined {
    if (status === undefined) return undefined;
    if (Object.values(TASK_STATUS).includes(status as TaskStatus)) {
      return status as TaskStatus;
    }
    throw new ValidationError('Некоректне значення статусу');
  }

  private parsePriority(priority?: string): TaskPriority | undefined {
    if (priority === undefined) return undefined;
    if (Object.values(TASK_PRIORITY).includes(priority as TaskPriority)) {
      return priority as TaskPriority;
    }
    throw new ValidationError('Некоректне значення пріоритету');
  }

  private validate() {
    if (!this.title || this.title.length < 3) {
      throw new ValidationError('Назва має бути не менше 3 символів');
    }
    if (this.dueDate instanceof Date && isNaN(this.dueDate.getTime())) {
      throw new ValidationError('Некоректний формат дати дедлайну');
    }
  }
}
