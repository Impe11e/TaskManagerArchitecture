//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';
//import UserDtoMapper from "../dtoMapper/userDtoMapper.js";

class UpdateUser {
    constructor(repository, domainService) {
        this.repository = repository;
        this.domainService = domainService;
    }

    async execute(dto) {
        const user = await this.repository.findById(dto.id)

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
}

//export default new UpdateUser(usersRepo, UserDtoMapper);
export default UpdateUser;