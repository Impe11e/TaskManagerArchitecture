import { NotFoundError } from '../../errors/applicationErrors.js';
import { TaskEntity } from '../../../domain/tasks/entities/taskEntity.js';
import { ITaskRepository } from '../../../domain/tasks/repoInterfaces/ITaskRepository.js';

export class GetTaskByIdUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.getById(id);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    return task;
  }
}
