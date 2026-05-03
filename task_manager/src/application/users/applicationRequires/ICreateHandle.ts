import type {CreateUserCommand} from "./commands/createUser.js";

export interface ICreateHandler {
    handle(command: CreateUserCommand): Promise<{id: number}>;
}