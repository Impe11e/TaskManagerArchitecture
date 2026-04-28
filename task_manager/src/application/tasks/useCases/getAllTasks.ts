import { TaskEntity } from '../../../domain/tasks/entities/taskEntity.js';
import { ITaskRepository } from '../../../domain/tasks/repoInterfaces/ITaskRepository.js';

export class GetAllTasksUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(): Promise<TaskEntity[]> {
    return this.taskRepository.getAll();
  }
}
