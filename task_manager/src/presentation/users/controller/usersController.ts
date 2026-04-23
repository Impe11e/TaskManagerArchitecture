//import UserCreateDto from '../requestDto/userCreateDto.js'
import type {CreateUserCommand} from "../../../application/users/commands/createUser.js";
import type {DeleteUserCommand} from "../../../application/users/commands/deleteUserById.js";
import type {UpdateUserCommand} from "../../../application/users/commands/updateUser.js";
import type {FindUserQuery} from "../../../application/users/queries/findUserById.js";
import type {IHandler} from "../../../application/users/IHandler.js";
import type UserEntity from "../../../domain/users/entity/userEntity.js";
import type {IUserController} from "./IUserController.js";
import type {ResponseType, DataType} from "./controllerTypes.js";

import responseMapper from '../responseDto/usersResponseDtoMapper.js'
import handle from "../../errors/errorHandler.js";
import {ValidationError} from "../../errors/presentationErrors.js";

class UsersController implements IUserController{
    private createHandler: IHandler<CreateUserCommand, {id: number}>;
    private updateHandler: IHandler<UpdateUserCommand, {id: number}>;
    private findHandler: IHandler<FindUserQuery, UserEntity>;
    private deleteHandler: IHandler<DeleteUserCommand, boolean>;

    constructor(createHandler: IHandler<CreateUserCommand, {id: number}>,
                updateHandler: IHandler<UpdateUserCommand, {id: number}>,
                findHandler: IHandler<FindUserQuery, UserEntity>,
                deleteHandler: IHandler<DeleteUserCommand, boolean>) {
        this.createHandler = createHandler
        this.updateHandler = updateHandler
        this.findHandler = findHandler
        this.deleteHandler = deleteHandler
    }

    async create(data: DataType): Promise<ResponseType> {
        try {
            this._validateData(data, true);
            const command: CreateUserCommand = {
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
            return handle(err)
        }
    }

    async update(id: string, data: DataType): Promise<ResponseType> {
        try {
            this._validateData(data, false);
            const pid:number = this._parseId(id)
            const command: UpdateUserCommand = {
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
            return handle(err)
        }
    }

    async findById(id: string): Promise<ResponseType> {
        try {
            const pid: number = this._parseId(id);
            const query: FindUserQuery = {id: pid}
            const user = await this.findHandler.handle(query)
            return {
                status: 200,
                data: responseMapper.toResponseDto(user)
            }
        } catch (err) {
            return handle(err)
        }
    }

    async deleteById(id: string): Promise<ResponseType> {
        try {
            const pid: number = this._parseId(id);
            const command:DeleteUserCommand = {id: pid}
            await this.deleteHandler.handle(command)
            return {
                status: 204,
                data: null
            }
        } catch (err) {
            return handle(err)
        }
    }

    _validateData(data: DataType, strict = false) {
        if (!data || typeof data !== 'object') {
            throw new ValidationError('Validation error: Invalid data (not object)');
        }

        const REQUIRED = ['email', 'username', 'password'];
        const ALLOWED = ['id', ...REQUIRED];
        const attributes = Object.keys(data)

        for (const attribute of attributes) {
            if (!ALLOWED.includes(attribute)) {
                throw new ValidationError(`Validation error: User doesnt have ${attribute} as an attribute`);
            }
        }
        if (strict) {
            for (const required of REQUIRED) {
                if (!attributes.includes(required)) {
                    throw new ValidationError(`Validation error: User's attribute missing: ${required}`);
                }
            }
        }

        //Types validations
        this._validateEmail(data.email)
        this._validateUsername(data.username)
        this._validatePassword(data.password)
    }

    _parseId(rawId: string): number {
        const id = parseInt(rawId)
        if (typeof id !== 'number') {
            throw new ValidationError('Validation error: Id must be a number');
        }
        if (!Number.isInteger(id)) {
            throw new ValidationError('Validation error: Invalid user id');
        }

        return id
    }

    _validateEmail(email: string) {
        if (email && typeof email !== 'string') {
            throw new ValidationError(`Validation error: email must be a string`);
        }
    }

    _validateUsername(username: string) {
        if (username && typeof username !== 'string') {
            throw new ValidationError(`Validation error: username must be a string`);
        }
    }

    _validatePassword(password: string) {
        if (password && typeof password !== 'string') {
            throw new ValidationError(`Validation error: password must be a string`);
        }
    }
}

export default UsersController