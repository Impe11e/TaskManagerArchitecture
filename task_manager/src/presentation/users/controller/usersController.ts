//import UserCreateDto from '../requestDto/userCreateDto.js'
import type {ICreateHandler} from "../../../application/users/applicationRequires/IHandles/ICreateHandle.js";
import type {IDeleteHandler} from "../../../application/users/applicationRequires/IHandles/IDeleteHandler.js";
import type {IUpdateHandler} from "../../../application/users/applicationRequires/IHandles/IUpdateHandler.js";
import type {IFindHandler} from "../../../application/users/applicationRequires/IHandles/IFindHandler.js";

import type {IUserController} from "../controllerRequires/IUserController.js";
import type {ResponseType, DataType} from "../controllerRequires/controllerTypes.js";

import ResponseMapper from '../responseDto/usersResponseDtoMapper.js'
import handleError from "../../errors/errorHandler.js";
import Validator from "../../errors/validator.js";

class UsersController implements IUserController{
    private createHandler: ICreateHandler;
    private updateHandler: IUpdateHandler
    private findHandler: IFindHandler
    private deleteHandler: IDeleteHandler;

    constructor(createHandler: ICreateHandler,
                updateHandler: IUpdateHandler,
                findHandler: IFindHandler,
                deleteHandler: IDeleteHandler) {
        this.createHandler = createHandler
        this.updateHandler = updateHandler
        this.findHandler = findHandler
        this.deleteHandler = deleteHandler
    }

    async create(data: unknown): Promise<ResponseType> {
        try {
            const validData: DataType = Validator.validateData(data, true);
            const command = {
                username: validData.username,
                email: validData.email,
                password: validData.password
            }
            const res = await this.createHandler.handle(command)
            return {
                status: 201,
                data: res
            }

        } catch (err) {
            return handleError(err)
        }
    }

    async update(id: unknown, data: unknown): Promise<ResponseType> {
        try {
            const validData: Partial<DataType> = Validator.validateData(data, false);
            const pid: number = Validator.parseId(id)
            const command = {
                id: pid,
                username: validData.username,
                email: validData.email,
                password: validData.password
            };
            const res = await this.updateHandler.handle(command)
            return {
                status: 200,
                data: res
            }
        } catch (err) {
            return handleError(err)
        }
    }

    async findById(id: unknown): Promise<ResponseType> {
        try {
            const pid: number = Validator.parseId(id);
            const query = {id: pid}
            const user = await this.findHandler.handle(query)
            return {
                status: 200,
                data: ResponseMapper.toResponseDto(user)
            }
        } catch (err) {
            return handleError(err)
        }
    }

    async deleteById(id: unknown): Promise<ResponseType> {
        try {
            const pid: number = Validator.parseId(id);
            const command = {id: pid}
            await this.deleteHandler.handle(command)
            return {
                status: 204,
                data: null
            }
        } catch (err) {
            return handleError(err)
        }
    }
}

export default UsersController