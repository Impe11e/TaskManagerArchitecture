//import UserCreateDto from '../requestDto/userCreateDto.js'
import CreateUserCommand from "../../../application/users/commands/createUser.js";
import DeleteUserCommand from "../../../application/users/commands/deleteUserById.js";
import UpdateUserCommand from "../../../application/users/commands/updateUser.js";
import FindUserQuery from "../../../application/users/queries/findUserById.js";

import responseMapper from '../responseDto/usersResponseDtoMapper.js'
import handle from "../../errors/errorHandler.js";
import {ValidationError} from "../../errors/presentationErrors.js";

class UsersController {
    constructor(createHandler, updateHandler, findUserByIdCase, deleteHandler) {
        this.createHandler = createHandler
        this.updateHandler = updateHandler
        this.findUserByIdCase = findUserByIdCase
        this.deleteHandler = deleteHandler
    }

    async create(data) {
        try {
            this._validateData(data, true);
            const command = new CreateUserCommand(
                data.username, data.email, data.password,
            )
            const user_id = await this.createHandler.handle(command)
            return {
                status: 201,
                data: {id : user_id}
            }

        } catch (err) {
            return handle(err)
        }
    }

    async update(id, data) {
        try {
            this._validateData(data, false);
            this._parseId(id)
            const command = new UpdateUserCommand(
                id,
                data.username ?? undefined,
                data.email ?? undefined,
                data.password ?? undefined
            );
            const user_id = await this.updateHandler.handle(command)
            return {
                status: 200,
                data: {id : user_id}
            }
        } catch (err) {
            return handle(err)
        }
    }

    async findById(id) {
        try {
            this._parseId(id);
            const command = new FindUserQuery(id)
            const user = await this.findUserByIdCase.handle(command)
            return {
                status: 200,
                data: responseMapper.toResponseDto(user)
            }
        } catch (err) {
            return handle(err)
        }
    }

    async deleteById(id) {
        try {
            this._parseId(id);
            const command = new DeleteUserCommand(id)
            await this.deleteHandler.handle(command)
            return {
                status: 204,
                data: null
            }
        } catch (err) {
            return handle(err)
        }
    }

    _validateData(data, strict = false) {
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

    _parseId(rawId) {
        const id = parseInt(rawId)
        if (typeof id !== 'number') {
            throw new ValidationError('Validation error: Id must be a number');
        }
        if (!Number.isInteger(id)) {
            throw new ValidationError('Validation error: Invalid user id');
        }

        return id
    }

    _validateEmail(email) {
        if (email && typeof email !== 'string') {
            throw new ValidationError(`Validation error: email must be a string`);
        }
    }

    _validateUsername(username) {
        if (username && typeof username !== 'string') {
            throw new ValidationError(`Validation error: username must be a string`);
        }
    }

    _validatePassword(password) {
        if (password && typeof password !== 'string') {
            throw new ValidationError(`Validation error: password must be a string`);
        }
    }
}

export default UsersController