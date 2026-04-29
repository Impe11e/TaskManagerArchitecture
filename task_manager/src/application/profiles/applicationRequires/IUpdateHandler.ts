import type { UpdateProfileCommand } from "./commands/updateProfile.js";

export interface IUpdateHandler {
  handle(command: UpdateProfileCommand): Promise<{ id: number }>;
}
