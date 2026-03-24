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

        return this.repository.update(user);
    }
}

//export default new UpdateUser(usersRepo, UserDtoMapper);
export default UpdateUser;