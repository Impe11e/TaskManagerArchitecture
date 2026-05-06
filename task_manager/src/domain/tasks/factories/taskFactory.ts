import { TaskEntity, TaskProps } from '../entities/taskEntity.js';
import { InvariantError } from '../../errors/domainErrors.js';
import { TASK_STATUS } from '../../constants/tasks/taskConsts.js';
import { ITaskRepository } from '../repoInterfaces/ITaskRepository.js';

export class TaskFactory {
  constructor(private taskRepository: ITaskRepository) {}

  async create(data: TaskProps): Promise<TaskEntity> {
    if (data.dueDate && new Date(data.dueDate) < new Date()) {
      throw new InvariantError('Due date cannot be in the past.');
    }
    if (data.title) {
      const existingTask = await this.taskRepository.findByTitle?.(data.title);
      if (existingTask) {
        throw new InvariantError('A task with this title already exists.');
      }
    }
    const activeLimit = 5;
    const activeTasksCount = await this.taskRepository.countByStatus?.(TASK_STATUS.IN_PROGRESS) ?? 0;
    if (activeTasksCount >= activeLimit) {
      throw new InvariantError(`Active tasks limit reached (${activeLimit}).`);
    }
    return new TaskEntity({
      ...data,
      createdAt: new Date(),
    });
  }
}
