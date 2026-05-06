import type { GetAllTasksQuery } from './queries/getAllTasksQuery';
export interface TaskReadDTO {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date | null;
  createdAt: Date;
}

export interface IGetAllHandler {
  execute(query: GetAllTasksQuery): Promise<TaskReadDTO[]>;
}
