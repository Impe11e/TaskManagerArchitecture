import type { UpdateTaskCommand } from './commands/updateTaskCommand';
export interface IUpdateHandler {
  execute(command: UpdateTaskCommand): Promise<void>;
}
