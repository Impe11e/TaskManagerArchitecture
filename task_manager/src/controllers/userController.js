import userService from '../services/userService.js'

class UserController {
    constructor(service) {
        this.service = service
    }

    createUser(data) {
        try {
            //validation...

            const user = this.service.createUser(data)
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

    updateUser(id, data) {
        try {
            //validation...
            id = parseInt(id)

            const user = this.service.updateUser(id, data)
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

    findUserById(id) {
        try {
            //validation...
            id = parseInt(id)


            const user = this.service.findUserById(id)
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

    deleteUserById(id) {
        try {
            //validation...
            id = parseInt(id)


            this.service.deleteUserById(id)
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

export default new UserController(userService)