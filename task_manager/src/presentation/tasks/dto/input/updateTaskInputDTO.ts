import { ValidationError } from '../../../errors/presentationErrors.js';


export interface UpdateTaskInputDTOProps {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string | Date;
}

export class UpdateTaskInputDTO implements UpdateTaskInputDTOProps {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: Date;

  constructor(data: UpdateTaskInputDTOProps) {
    this.title = data.title?.trim();
    this.description = data.description?.trim();
    this.status = data.status;
    this.priority = data.priority;
    this.dueDate = data.dueDate !== undefined ? new Date(data.dueDate) : undefined;
    this.validate();
    Object.freeze(this);
  }

  private validate() {
    if (this.title !== undefined && this.title.length < 3) {
      throw new ValidationError('Назва має бути не менше 3 символів');
    }
    if (this.dueDate !== undefined && this.dueDate && isNaN(this.dueDate.getTime())) {
      throw new ValidationError('Некоректний формат дати дедлайну');
    }
    if (this.status === null || this.priority === null) {
      throw new ValidationError('Некоректне значення статусу або пріоритету');
    }
  }
}
