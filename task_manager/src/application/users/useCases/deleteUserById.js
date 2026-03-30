//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';
import {NotFoundError} from '../../errors/applicationErrors.js';

class DeleteUserById {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(dto) {
        const id = dto.id;
        await this._findUserOrFail(id)
        return await this.repository.deleteById(id);
    }

    async _findUserOrFail(id) {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new NotFoundError('User with this not found');
        }
    }
}

//export default new DeleteUserById(usersRepo);
export default DeleteUserById;