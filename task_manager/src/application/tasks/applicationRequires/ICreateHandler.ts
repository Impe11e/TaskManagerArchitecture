import type { CreateTaskCommand } from './commands/createTaskCommand';

export interface ICreateHandler {
  execute(command: CreateTaskCommand): Promise<number | undefined>;
}
