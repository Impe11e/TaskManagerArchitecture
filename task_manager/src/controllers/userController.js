import usersService from '../services/userService.js'
import {ValidationError} from "../errors/customErrors.js";
import handle from "../errors/errorHandler.js";

class UsersController {
    constructor(service) {
        this.service = service
    }

    #validateData(data, strict = false) {
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
    }

    create(data) {
        try {
            this.#validateData(data, true);

            const user = this.service.create(data)
            return {
                status: 201,
                data: user
            }

        } catch (err) {
            return handle(err)
        }
    }

    update(id, data) {
        try {
            this.#validateData(data);

            const user = this.service.update(id, data)
            return {
                status: 200,
                data: user
            }
        } catch (err) {
            return handle(err)
        }
    }

    findById(id) {
        try {
            const user = this.service.findById(id)
            return {
                status: 200,
                data: user
            }
        } catch (err) {
            return handle(err)
        }
    }

    deleteById(id) {
        try {
            this.service.deleteById(id)
            return {
                status: 204,
                data: null
            }
        } catch (err) {
            return handle(err)
        }
    }
}

export default new

UsersController(usersService)