import { TaskPriority, TaskStatus } from '../../../../domain/constants/tasks/taskConsts.js';

export class UpdateTaskCommand {
  constructor(
    public id: number,
    public title?: string,
    public description?: string,
    public status?: TaskStatus,
    public priority?: TaskPriority,
    public dueDate?: string | Date
  ) {}
}
