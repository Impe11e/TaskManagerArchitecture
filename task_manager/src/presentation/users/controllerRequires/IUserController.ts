import type {ResponseType, DataType} from "./controllerTypes.js";

export interface IUserController {
    findById(id: string): Promise<ResponseType>;
    create(data: DataType): Promise<ResponseType>;
    update(id: string, data: DataType): Promise<ResponseType>;
    deleteById(id: string): Promise<ResponseType>;
}