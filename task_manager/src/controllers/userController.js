import usersService from '../services/userService.js'

class UsersController {
    constructor(service) {
        this.service = service
    }

    create(data) {
        try {
            //validation...

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
            //validation...
            id = parseInt(id)

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
            //validation...
            id = parseInt(id)


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
            //validation...
            id = parseInt(id)


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