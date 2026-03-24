//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';
//import UserDtoMapper from "../dtoMapper/userDtoMapper.js";

class FindUserById {
    constructor(repository, dtoMapper) {
        this.repository = repository;
        this.dtoMapper = dtoMapper;
    }

    execute(dto) {
        const id = dto.id;
        const userEntity = this.repository.findById(id)

        return this.dtoMapper.toDto(userEntity)
    }
}

//export default new FindUserById(usersRepo, UserDtoMapper);
export default FindUserById