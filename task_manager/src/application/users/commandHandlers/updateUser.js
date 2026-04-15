//import usersRepo from '../../../infrastructure/users/repository/usersRepo.js';
//import UserDtoMapper from "../dtoMapper/userDtoMapper.js";
import {NotFoundError} from '../../errors/applicationErrors.js';

class UpdateUserCommandHandler {
    constructor(repository, domainService) {
        this.repository = repository;
        this.domainService = domainService;
    }

    async handle(command) {
        const userDM = await this._findUserOrFail(command.id)

        if (command.email) {
            await this.domainService.checkByEmail(command.email);
        }
        if (command.username) {
            await this.domainService.checkByUsername(command.username);
        }

        userDM.update({
            username: command.username,
            email: command.email,
            password: command.password
        })

        const updatedUser = await this.repository.update(userDM)

        return {id: updatedUser.id}
    }

    async _findUserOrFail(id) {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new NotFoundError('User with this id not found');
        }

        return user
    }
}

//export default new UpdateUser(usersRepo, UserDtoMapper);
export default UpdateUserCommandHandler;