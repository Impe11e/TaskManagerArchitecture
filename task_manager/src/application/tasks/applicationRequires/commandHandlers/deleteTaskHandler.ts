import { DeleteTaskCommand } from '../commands/deleteTaskCommand';
import { ITaskRepository } from '../../../../domain/tasks/repoInterfaces/ITaskRepository';
import { NotFoundError } from '../../../errors/applicationErrors.js';
import NotificationService from '../../../../modules/notifications/NotificationService';

export class DeleteTaskHandler {
  constructor(
    private readonly repo: ITaskRepository,
    private readonly notificationService: NotificationService
  ) {}

  async execute(command: DeleteTaskCommand): Promise<void> {
    const deleted = await this.repo.delete(command.id);
    if (deleted) {
      this.notificationService.notifyTaskDeleted(command.id);
    } else {
      throw new NotFoundError('Task not found');
    }
  }
}
