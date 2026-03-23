import {ValidationError} from "../../tools/errors/customErrors.js";

class UserDto {
    constructor() {
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

export default UserDto;