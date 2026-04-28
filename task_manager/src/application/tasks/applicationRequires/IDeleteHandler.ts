import type { DeleteTaskCommand } from './commands/deleteTaskCommand';
export interface IDeleteHandler {
  execute(command: DeleteTaskCommand): Promise<void>;
}
