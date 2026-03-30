import UserCreateDto from '../requestDto/userCreateDto.js'
import UserUpdateDto from '../requestDto/userUpdateDto.js'
import UserFindByIdDto from '../requestDto/userFindByIdDto.js'
import responseMapper from '../responseDto/usersResponseDtoMapper.js'
import handle from "../../errors/errorHandler.js";
import {ValidationError} from "../../errors/customErrors.js";

class UsersController {
    constructor(createCase, updateCase, findUserByIdCase, deleteUserByIdCase) {
        this.createCase = createCase
        this.updateCase = updateCase
        this.findUserByIdCase = findUserByIdCase
        this.deleteUserByIdCase = deleteUserByIdCase
    }

    async create(data) {
        try {
            this._validateData(data, true);
            const dto = new UserCreateDto(data)
            const user = await this.createCase.execute(dto)
            return {
                status: 201,
                data: responseMapper.toResponseDto(user),
            }

        } catch (err) {
            return handle(err)
        }
    }

    async update(id, data) {
        try {
            this._validateData(data, false);
            this._validateId(id)
            const dto = new UserUpdateDto(id, data)
            const user = await this.updateCase.execute(dto)
            return {
                status: 200,
                data: responseMapper.toResponseDto(user)
            }
        } catch (err) {
            return handle(err)
        }
    }

    async findById(id) {
        try {
            this._validateId(id);
            const dto = new UserFindByIdDto(id)
            const user = await this.findUserByIdCase.execute(dto)
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
            this._validateId(id);
            const dto = new UserFindByIdDto(id)
            const isDeleted = await this.deleteUserByIdCase.execute(dto)
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

    _validateId(id) {
        if (typeof id !== 'number') {
            throw new ValidationError('Validation error: Id must be a number');
        }
        if (!Number.isInteger(id)) {
            throw new ValidationError('Validation error: Invalid user id');
        }
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