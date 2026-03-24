//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';
//import UserDtoMapper from "../dtoMapper/userDtoMapper.js";

class UpdateUser {
    constructor(repository, dtoMapper) {
        this.repository = repository;
        this.dtoMapper = dtoMapper;
    }

    execute(dto) {
        const {id, ...data} = dto;
        const user = this.repository.findById(id)
        user.update({
            username: data.username,
            email: data.email,
            password: data.password
        })

        const updatedUser = this.repository.update(user);

        return this.dtoMapper.toDto(updatedUser);
    }
}

//export default new UpdateUser(usersRepo, UserDtoMapper);
export default UpdateUser;