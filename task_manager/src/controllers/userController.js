import usersService from '../services/userService.js'

class UsersController {
    constructor(service) {
        this.service = service
    }

    #validateData(data, strict = false){
        if(!data || typeof data !== 'object'){
            throw new Error('Validation error: Invalid data (not object)');
        }

        const REQUIRED = ['email', 'username', 'password'];
        const ALLOWED = ['id', ...REQUIRED];
        const attributes = Object.keys(data)

        for (const attribute of attributes) {
            if(!ALLOWED.includes(attribute)) {
                throw new Error(`Validation error: User doesnt have ${attribute}`);
            }
        }
        if(strict){
            for (const required of REQUIRED){
                if(!attributes.includes(required)){
                    throw new Error(`Validation error: User's attribute missing: ${required}`);
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
            return {
                status: 404,
                data: err.message
            }
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
            return {
                status: 404,
                data: err.message
            }
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
            return {
                status: 404,
                data: err.message
            }
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
            return {
                status: 404,
                data: err.message
            }
        }
    }
}

export default new UsersController(usersService)