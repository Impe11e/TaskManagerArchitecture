//import UserCreateDto from '../requestDto/userCreateDto.js'
import type {ICreateHandler} from "../../../application/users/applicationRequires/ICreateHandle.js";
import type {IDeleteHandler} from "../../../application/users/applicationRequires/IDeleteHandler.js";
import type {IUpdateHandler} from "../../../application/users/applicationRequires/IUpdateHandler.js";
import type {IFindHandler} from "../../../application/users/applicationRequires/IFindHandler.js";

import type {IUserController} from "../presentationRequires/IUserController.js";
import type {ResponseType, DataType} from "../presentationRequires/controllerTypes.js";

import ResponseMapper from '../responseDto/usersResponseDtoMapper.js'
import handleError from "../../errors/errorHandler.js";
import Validator from "../../validation/validator.js";

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

    async create(data: DataType): Promise<ResponseType> {
        try {
            Validator.validateData(data, true);
            const command = {
                username: data.username,
                email: data.email,
                password: data.password
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

    async update(id: string, data: DataType): Promise<ResponseType> {
        try {
            Validator.validateData(data, false);
            const pid:number = Validator.parseId(id)
            const command = {
                id: pid,
                username: data.username ?? undefined,
                email: data.email ?? undefined,
                password: data.password ?? undefined
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

    async findById(id: string): Promise<ResponseType> {
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

    async deleteById(id: string): Promise<ResponseType> {
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