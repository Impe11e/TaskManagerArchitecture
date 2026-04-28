import { UpdateTaskCommand } from '../commands/updateTaskCommand';
import { ITaskRepository } from '../../../../domain/tasks/repoInterfaces/ITaskRepository';
import { NotFoundError, ValidationError } from '../../../errors/applicationErrors.js';

export class UpdateTaskHandler {
  constructor(private readonly repo: ITaskRepository) {}

  async execute(command: UpdateTaskCommand): Promise<void> {
    const task = await this.repo.getById(command.id);
    if (!task) {
      throw new NotFoundError('Task not found');
    }

    if (command.title !== undefined) {
      task.title = command.title;
    }
    if (command.description !== undefined) {
      task.description = command.description;
    }
    if (command.status !== undefined) {
      task.status = command.status;
    }
    if (command.priority !== undefined) {
      task.changePriority(command.priority);
    }
    if (command.dueDate !== undefined) {
      const dueDate = command.dueDate ? new Date(command.dueDate) : null;
      if (dueDate && dueDate < new Date()) {
        throw new ValidationError('Due date cannot be in the past');
      }
      task.dueDate = dueDate;
    }

    if (task.title.length < 3) {
      throw new ValidationError('Title must be at least 3 chars.');
    }

    await this.repo.update(command.id, task);
  }
}
