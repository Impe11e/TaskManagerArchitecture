import { TaskEntity, TaskProps } from '../../../domain/tasks/entities/taskEntity.js';
import { TaskFactory } from '../../../domain/tasks/factories/taskFactory.js';
import { ITaskRepository } from '../../../domain/tasks/repoInterfaces/ITaskRepository.js';

export class CreateTaskUseCase {
  constructor(
    private taskRepository: ITaskRepository,
    private taskFactory: TaskFactory
  ) {}

  async execute(dto: TaskProps): Promise<TaskEntity> {
    const task = await this.taskFactory.create(dto);
    const savedTask = await this.taskRepository.create(task);
    return savedTask;
  }
}
