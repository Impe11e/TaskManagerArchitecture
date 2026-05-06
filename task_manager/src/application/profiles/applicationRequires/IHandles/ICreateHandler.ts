import type { CreateProfileCommand } from "../commands/createProfile.js";

export interface ICreateHandler {
  handle(command: CreateProfileCommand): Promise<{ id: number }>;
}
