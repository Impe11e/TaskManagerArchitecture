//import usersRepo from '../../../infrastructure/users/repository/usersRepo.js';
//import UserDtoMapper from "../dtoMapper/userDtoMapper.js";
import {NotFoundError} from '../../errors/applicationErrors.js';

class UpdateUser {
    constructor(repository, domainService) {
        this.repository = repository;
        this.domainService = domainService;
    }

    async execute(dto) {
        const user = await this._findUserOrFail(dto.id)

        if (dto.email) {
            await this.domainService.checkByEmail(dto.email);
        }
        if (dto.username) {
            await this.domainService.checkByUsername(dto.username);
        }

        user.update({
            username: dto.username,
            email: dto.email,
            password: dto.password
        })

        return await this.repository.update(user);
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
export default UpdateUser;