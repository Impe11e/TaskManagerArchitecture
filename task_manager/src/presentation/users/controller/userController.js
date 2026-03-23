import createUser from '../../application/users/useCases/createUser.js'
import updateUser from '../../application/users/useCases/updateUser.js'
import findUserById from '../../application/users/useCases/findUserById.js'
import deleteUserById  from '../../application/users/useCases/deleteUserById.js'

import UserCreateDto from '../dto/userCreateDto.js'
import UserUpdateDto from '../dto/userUpdateDto.js'
import UserFindByIdDto from '../dto/userFindByIdDto.js'
import handle from "../../tools/errors/errorHandler.js";

class UsersController {
    constructor(createCase, updateCase, findUserByIdCase, deleteUserByIdCase) {
        this.createCase = createCase
        this.updateCase = updateCase
        this.findUserByIdCase = findUserByIdCase
        this.deleteUserByIdCase = deleteUserByIdCase
    }

    create(data) {
        try {
            const dto = new UserCreateDto(data)
            const user = this.createCase.execute(dto)
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
            const dto = new UserUpdateDto(id, data)
            const user = this.updateCase.execute(dto)
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
            const dto = new UserFindByIdDto(id)
            const user = this.findUserByIdCase.execute(dto)
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
            const dto = new UserFindByIdDto(id)
            this.deleteUserByIdCase.execute(dto)
            return {
                status: 204,
                data: null
            }
        } catch (err) {
            return handle(err)
        }
    }
}

export default new UsersController(createUser, updateUser, findUserById, deleteUserById)