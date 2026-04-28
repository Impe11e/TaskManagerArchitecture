import { NotFoundError } from '../../errors/applicationErrors.js';
import { ITaskRepository } from '../../../domain/tasks/repoInterfaces/ITaskRepository.js';

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: number): Promise<void> {
    const task = await this.taskRepository.getById(id);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    await this.taskRepository.delete(id);
  }
}
