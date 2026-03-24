//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';
//import UserEntity from "../../../domain/users/entity/userEntity.js";
//import UserDtoMapper from "../dtoMapper/userDtoMapper.js";

class CreateUser {
    constructor(repository, userEntity, dtoMapper) {
        this.repository = repository;
        this.userEntity = userEntity;
        this.dtoMapper = dtoMapper;
    }

    execute(dto) {
        const user = this.userEntity.createEntityWithoutId(dto.username, dto.email, dto.password);
        const userEntity = this.repository.create(user);
        return this.dtoMapper.toDto(userEntity);
    }
}

//export default new CreateUser(usersRepo, UserDtoMapper);
export default CreateUser