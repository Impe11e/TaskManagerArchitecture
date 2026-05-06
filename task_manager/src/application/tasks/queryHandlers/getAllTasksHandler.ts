import { GetAllTasksQuery } from '../applicationRequires/queries/getAllTasksQuery';
import { ITaskRepository } from '../../../domain/tasks/repoInterfaces/ITaskRepository';

export class GetAllTasksHandler {
  constructor(private readonly repo: ITaskRepository) {}

  async execute(query: GetAllTasksQuery) {
    const tasks = await this.repo.getAll();
    return tasks.map((task) => ({
      id: task.id ?? 0,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ?? null,
      createdAt: task.createdAt,
    }));
  }
}
