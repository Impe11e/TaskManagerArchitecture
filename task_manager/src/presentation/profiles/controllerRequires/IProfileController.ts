import type { ResponseType } from "./controllerTypes.js";

export interface IProfileController {
  findById(id: unknown): Promise<ResponseType>;
  create(data: unknown): Promise<ResponseType>;
  update(id: unknown, data: unknown): Promise<ResponseType>;
  deleteById(id: unknown): Promise<ResponseType>;
}
