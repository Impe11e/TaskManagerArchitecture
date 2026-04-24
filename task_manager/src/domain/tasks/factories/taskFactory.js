import TaskEntity from '../entities/taskEntity.js'; 
import { InvariantError } from "../../errors/domainErrors.js";
import { TASK_STATUS } from '../../constants/tasks/taskConsts.js';

export default class TaskFactory {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

    async create(data) {
      if (data.dueDate && new Date(data.dueDate) < new Date()) {
        throw new InvariantError('Due date cannot be in the past.');
      }
      if (data.title) {
        const existingTask = await this.taskRepository.findByTitle(data.title);
        if (existingTask) {
          throw new InvariantError('A task with this title already exists.');
        }
      }
      const activeLimit = 5;
      const activeTasksCount = await this.taskRepository.countByStatus(TASK_STATUS.IN_PROGRESS);
      if (activeTasksCount >= activeLimit) {
        throw new InvariantError(`Active tasks limit reached (${activeLimit}).`);
      }
      const entity = new TaskEntity({
        ...data,
        createdAt: new Date()
      });
      return entity;
    }
}