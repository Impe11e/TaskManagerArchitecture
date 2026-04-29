import type {DeleteUserCommand} from "../commands/deleteUserById.js";

export interface IDeleteHandler {
    handle(command: DeleteUserCommand): Promise<boolean>;
}