import { ValidationError } from '../../../application/errors/customErrors.js';

export default class UpdateTaskDTO {
  constructor(data) {
    this.title = data.title?.trim();
    this.description = data.description?.trim();
    
    this.dueDate = data.dueDate !== undefined ? new Date(data.dueDate) : undefined;

    this.#validate();
    Object.freeze(this); 
  }

  #validate() {
    if (this.title !== undefined && this.title.length < 3) {
      throw new ValidationError('Назва має бути не менше 3 символів');
    }
    if (this.dueDate !== undefined && isNaN(this.dueDate.getTime())) {
      throw new ValidationError('Некоректний формат дати дедлайну');
    }
    if (this.status === null || this.priority === null) {
        throw new ValidationError('Некоректне значення статусу або пріоритету');
    }
  }
}
