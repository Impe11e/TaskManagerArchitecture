//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';
//import UserDtoMapper from "../dtoMapper/userDtoMapper.js";

class FindUserById {
    constructor(repository, dtoMapper) {
        this.repository = repository;
        this.dtoMapper = dtoMapper;
    }

    execute(dto) {
        const id = dto.id;
        const user = this.repository.findById(id)

        return user.toSafe()
    }
}

//export default new FindUserById(usersRepo, UserDtoMapper);
export default FindUserById