//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';
//import UserDtoMapper from "../dtoMapper/userDtoMapper.js";

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
            throw new Error('User not found');
        }

        return user;
    }
}

//export default new FindUserById(usersRepo, UserDtoMapper);
export default FindUserById