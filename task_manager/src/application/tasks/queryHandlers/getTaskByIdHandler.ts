import { GetTaskByIdQuery } from '../applicationRequires/queries/getTaskByIdQuery';
import { ITaskRepository } from '../../../domain/tasks/repoInterfaces/ITaskRepository';

export class GetTaskByIdHandler {
  constructor(private readonly repo: ITaskRepository) {}

  async execute(query: GetTaskByIdQuery) {
    const task = await this.repo.getById(query.id);
    if (!task) return null;

    return {
      id: task.id ?? 0,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ?? null,
      createdAt: task.createdAt,
    };
  }
}
