import userService from '../services/userService'

class UserController {
    constructor (service) {
        this.service = service
    }

    createUser (data) {
        //validation...

        const user = this.service.createUser(data)

        if (!user){
            return {
                status: 404,
                data: {"error": "Unable to create user"}
            }
        }

        return {
            status: 201,
            data: user
        }
    }

    updateUser (id, data) {
        //validation...

        const user = this.service.updateUser(id, data)

        if (!user){
            return {
                status: 404,
                data: {"error": "Unable to update user"}
            }
        }

        return {
            status: 200,
            data: user
        }
    }

    findUserById (id) {
        //validation...

        const user = this.service.findUserById(id)

        if (!user){
            return {
                status: 404,
                data: {"error": "Unable to find user"}
            }
        }

        return {
            status: 200,
            data: user
        }
    }

    deleteUserById (id) {
        //validation...

        const deleted = this.service.deleteUserById(id)

        if (deleted){
            return {
                status: 404,
                data: {"error": "Unable to delete user"}
            }
        }

        return {
            status: 204,
            data: null
        }
    }
}