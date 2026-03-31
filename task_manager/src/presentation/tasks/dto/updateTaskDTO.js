import { ValidationError } from '../../errors/presentationErrors.js';

export default class UpdateTaskDTO {
  constructor(data) {
    this.title = data.title?.trim();
    this.description = data.description?.trim();
    this.userId = data.userId ? parseInt(data.userId, 10) : undefined;
    
    this.dueDate = data.dueDate !== undefined ? new Date(data.dueDate) : undefined;
    this.status = data.status;
    this.priority = data.priority;

    this.#validate();
    Object.freeze(this); 
  }

  #validate() {
    if (this.title !== undefined && this.title.length < 3) {
      throw new ValidationError('Назва має бути не менше 3 символів');
    }
    if (this.userId !== undefined && this.userId <= 0) {
      throw new ValidationError('ID користувача має бути коректним');
    }
    if (this.dueDate !== undefined && isNaN(this.dueDate.getTime())) {
      throw new ValidationError('Некоректний формат дати дедлайну');
    }
    if (this.status === null || this.priority === null) {
        throw new ValidationError('Некоректне значення статусу або пріоритету');
    }
  }
}
