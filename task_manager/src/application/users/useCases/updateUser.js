//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';
//import UserDtoMapper from "../dtoMapper/userDtoMapper.js";

class UpdateUser {
    constructor(repository, dtoMapper) {
        this.repository = repository;
        this.dtoMapper = dtoMapper;
    }

    async execute(dto) {
        const {id, ...data} = dto;
        const user = await this.repository.findById(id)
        user.update({
            username: data.username,
            email: data.email,
            password: data.password
        })

        const updatedUser = await this.repository.update(user);

        return updatedUser.toSafe();
    }
}

//export default new UpdateUser(usersRepo, UserDtoMapper);
export default UpdateUser;