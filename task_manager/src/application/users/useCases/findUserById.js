//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';
//import UserDtoMapper from "../dtoMapper/userDtoMapper.js";
import {NotFoundError} from '../../errors/applicationErrors.js';

class FindUserById {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(dto) {
        const id = dto.id;
        return await this._findUserOrFail(id)
    }

    async _findUserOrFail(id) {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new NotFoundError('User with this id not found');
        }

        return user;
    }
}

//export default new FindUserById(usersRepo, UserDtoMapper);
export default FindUserById