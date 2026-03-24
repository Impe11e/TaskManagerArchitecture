//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';
//import UserDtoMapper from "../dtoMapper/userDtoMapper.js";

class FindUserById {
    constructor(repository, dtoMapper) {
        this.repository = repository;
        this.dtoMapper = dtoMapper;
    }

    execute(dto) {
        const id = dto.id;

        return this.repository.findById(id)
    }
}

//export default new FindUserById(usersRepo, UserDtoMapper);
export default FindUserById