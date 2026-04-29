import type {DataType} from "../users/controllerRequires/controllerTypes.js";
import {ValidationError} from "../errors/presentationErrors.js";

class Validator {
    static validateData(data: DataType, strict = false) {
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
        Validator.validateEmail(data.email)
        Validator.validateUsername(data.username)
        Validator.validatePassword(data.password)
    }

    static parseId(rawId: string): number {
        const id = parseInt(rawId)
        if (typeof id !== 'number') {
            throw new ValidationError('Validation error: Id must be a number');
        }
        if (!Number.isInteger(id)) {
            throw new ValidationError('Validation error: Invalid user id');
        }

        return id
    }

    static validateEmail(email: string) {
        if (email && typeof email !== 'string') {
            throw new ValidationError(`Validation error: email must be a string`);
        }
    }

    static validateUsername(username: string) {
        if (username && typeof username !== 'string') {
            throw new ValidationError(`Validation error: username must be a string`);
        }
    }

    static validatePassword(password: string) {
        if (password && typeof password !== 'string') {
            throw new ValidationError(`Validation error: password must be a string`);
        }
    }
}

export default Validator;