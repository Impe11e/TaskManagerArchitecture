import type { DeleteProfileCommand } from "../commands/deleteProfileById.js";

export interface IDeleteHandler {
  handle(command: DeleteProfileCommand): Promise<boolean>;
}
