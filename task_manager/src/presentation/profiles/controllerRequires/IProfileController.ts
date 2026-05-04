import type { ResponseType, ProfileDataType } from "./controllerTypes.js";

export interface IProfileController {
  findById(id: string): Promise<ResponseType>;
  create(data: ProfileDataType): Promise<ResponseType>;
  update(id: string, data: ProfileDataType): Promise<ResponseType>;
  deleteById(id: string): Promise<ResponseType>;
}
