import type {DataType} from "../users/controllerRequires/controllerTypes.js";
import {ValidationError} from "./presentationErrors.js";

class Validator {
    static validateData(data: unknown, strict = false): DataType {
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

        const obj = data as Record<string, unknown>;

        //Types validations
        Validator.validateEmail(obj.email)
        Validator.validateUsername(obj.username)
        Validator.validatePassword(obj.password)

        return data as DataType;
    }

    static parseId(rawId: unknown): number {
        if (typeof rawId == "string") {
            const id = parseInt(rawId)
            if (!Number.isInteger(id)) {
                throw new ValidationError('Validation error: Id seems not to be an integer');
            }
            return id;
        }
        throw new ValidationError('Validation error: controller should receive id as string');
    }

    static validateEmail(email: unknown) {
        if (email && typeof email !== 'string') {
            throw new ValidationError(`Validation error: email must be a string`);
        }
    }

    static validateUsername(username: unknown) {
        if (username && typeof username !== 'string') {
            throw new ValidationError(`Validation error: username must be a string`);
        }
    }

    static validatePassword(password: unknown) {
        if (password && typeof password !== 'string') {
            throw new ValidationError(`Validation error: password must be a string`);
        }
    }
}

export default Validator;