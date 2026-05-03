import { DeleteTaskCommand } from '../commands/deleteTaskCommand';
import { ITaskRepository } from '../../../../domain/tasks/repoInterfaces/ITaskRepository';

export class DeleteTaskHandler {
  constructor(private readonly repo: ITaskRepository) {}

  async execute(command: DeleteTaskCommand): Promise<void> {
    await this.repo.delete(command.id);
  }
}
