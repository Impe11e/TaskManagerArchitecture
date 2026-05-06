import { CreateTaskCommand } from '../applicationRequires/commands/createTaskCommand';
import { ITaskRepository } from '../../../domain/tasks/repoInterfaces/ITaskRepository';
import { TaskFactory } from '../../../domain/tasks/factories/taskFactory';
import EventBus from '../../../modules/eventBus/eventBus';
import TaskCreatedEvent from '../events/created';

export class CreateTaskHandler {
  constructor(
    private readonly repo: ITaskRepository,
    private readonly factory: TaskFactory,
    private readonly eventBus: EventBus
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

    this.eventBus.publish('TaskCreated', new TaskCreatedEvent(created));

    return created.id;
  }
}
 