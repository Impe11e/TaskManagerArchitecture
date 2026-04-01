import { ValidationError } from '../../errors/presentationErrors.js';

export default class CreateTaskDTO {
  constructor(data) {
    this.title = data.title?.trim();
    this.description = data.description?.trim() || '';
    this.userId = data.userId ? parseInt(data.userId, 10) : null;
    this.status = data.status || undefined;
    this.priority = data.priority || undefined;
    
    this.dueDate = data.dueDate ? new Date(data.dueDate) : null;

    this.#validate();
    Object.freeze(this); 
  }

  #validate() {
    if (!this.title || this.title.length < 3) {
      throw new ValidationError('Назва має бути не менше 3 символів');
    }
    if (!this.userId || this.userId <= 0) {
      throw new ValidationError('ID користувача є обов\'язковим');
    }
    if (this.dueDate && isNaN(this.dueDate.getTime())) {
      throw new ValidationError('Некоректний формат дати дедлайну');
    }
  }
}