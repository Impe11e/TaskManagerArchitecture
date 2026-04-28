
import { CreateTaskCommand } from '../commands/createTaskCommand';
import { ITaskRepository } from '../../../../domain/tasks/repoInterfaces/ITaskRepository';
import { TaskFactory } from '../../../../domain/tasks/factories/taskFactory';

export class CreateTaskHandler {
  constructor(
    private readonly repo: ITaskRepository,
    private readonly factory: TaskFactory
  ) {}

  async execute(command: CreateTaskCommand) {
    const dueDate = command.dueDate !== undefined ? new Date(command.dueDate) : undefined;

    const task = await this.factory.create({
      title: command.title,
      description: command.description,
      status: command.status,
      priority: command.priority,
      dueDate
    });
    const created = await this.repo.create(task);
    return created.id;
  }
}
 