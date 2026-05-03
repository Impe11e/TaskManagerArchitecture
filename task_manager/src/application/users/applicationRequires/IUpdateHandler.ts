import type {UpdateUserCommand} from "./commands/updateUser.js";

export interface IUpdateHandler {
    handle(command: UpdateUserCommand): Promise<{id: number}>;
}