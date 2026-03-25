import { ValidationError } from '../../../application/errors/customErrors.js';

export default class CreateTaskDTO {
  constructor(data) {
    this.title = data.title?.trim();
    this.description = data.description?.trim() || '';
    
    this.dueDate = data.dueDate ? new Date(data.dueDate) : null;

    this.#validate();
    Object.freeze(this); 
  }

  #validate() {
    if (!this.title || this.title.length < 3) {
      throw new ValidationError('Назва має бути не менше 3 символів');
    }
    if (this.dueDate && isNaN(this.dueDate.getTime())) {
      throw new ValidationError('Некоректний формат дати дедлайну');
    }
  }
}