import type { GetTaskByIdQuery } from './queries/getTaskByIdQuery';
import type { TaskReadDTO } from './IGetAllHandler.js';
export interface IGetByIdHandler {
  execute(query: GetTaskByIdQuery): Promise<TaskReadDTO | null>;
}
