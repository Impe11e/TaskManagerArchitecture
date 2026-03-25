import { TASK_PRIORITY, TASK_STATUS } from '../../../domain/constants/taskConsts.js';
import { ValidationError } from '../../../errors/customErrors.js';

export default class UpdateTaskDTO {
  constructor(data) {
    this.title = data.title?.trim();
    this.description = data.description?.trim();
    
    this.status = this.#normalize(data.status, TASK_STATUS);
    this.priority = this.#normalize(data.priority, TASK_PRIORITY);
    
    this.dueDate = data.dueDate !== undefined ? new Date(data.dueDate) : undefined;

    this.#validate();
    Object.freeze(this); 
  }

  #normalize(value, enumObj) {
    if (!value) return undefined;
    const upper = value.toString().toUpperCase();
    return Object.values(enumObj).includes(upper) ? upper : null;
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
