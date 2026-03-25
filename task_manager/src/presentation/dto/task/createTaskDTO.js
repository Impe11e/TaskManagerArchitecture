import { TASK_PRIORITY, TASK_STATUS } from '../../../domain/constants/taskConsts.js';
import { ValidationError } from '../../../errors/customErrors.js';

export default class CreateTaskDTO {
  constructor(data) {
    this.title = data.title?.trim();
    this.description = data.description?.trim() || '';
    
    this.status = this.#normalize(data.status, TASK_STATUS, TASK_STATUS.NEW);
    this.priority = this.#normalize(data.priority, TASK_PRIORITY, TASK_PRIORITY.MEDIUM);
    
    this.dueDate = data.dueDate ? new Date(data.dueDate) : null;

    this.#validate();
    Object.freeze(this); 
  }

  #normalize(value, enumObj, defaultValue) {
    if (!value) return defaultValue;
    const upper = value.toString().toUpperCase();
    return Object.values(enumObj).includes(upper) ? upper : defaultValue;
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