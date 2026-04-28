import { ValidationError } from '../../../errors/presentationErrors.js';

export interface CreateTaskInputDTOProps {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string | Date;
}

export class CreateTaskInputDTO implements CreateTaskInputDTOProps {
  title: string;
  description: string;
  status?: string;
  priority?: string;
  dueDate?: string | Date;

  constructor(data: CreateTaskInputDTOProps) {
    this.title = data.title?.trim();
    this.description = data.description?.trim() || '';
    this.status = data.status;
    this.priority = data.priority;
    this.dueDate = data.dueDate ? new Date(data.dueDate) : undefined;
    this.validate();
    Object.freeze(this);
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
