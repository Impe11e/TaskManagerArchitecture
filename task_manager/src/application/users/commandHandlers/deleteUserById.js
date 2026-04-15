//import usersRepo from '../../../infrastructure/users/repository/usersRepo.js';
import {NotFoundError} from '../../errors/applicationErrors.js';

class DeleteUserCommandHandler {
    constructor(repository) {
        this.repository = repository;
    }

    async handle(command) {
        const id = command.id;
        await this._findUserOrFail(id)

        //returns true if succeed
        return await this.repository.deleteById(id);
    }

    async _findUserOrFail(id) {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new NotFoundError('User with this id not found');
        }
    }
}

//export default new DeleteUserById(usersRepo);
export default DeleteUserCommandHandler;