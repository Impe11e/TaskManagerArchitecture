import usersRepo from '../../../infrastructure/repositories/userRepo.js';
import UserEntity from "../../../domain/users/userEntity.js";
import UserDtoMapper from "./dtoMapper/userDtoMapper.js";

class CreateUser {
    constructor(repository, dtoMapper) {
        this.repository = repository;
        this.dtoMapper = dtoMapper;
    }

    execute(dto) {
        const user = UserEntity.createEntityWithoutId(dto.username, dto.email, dto.password);
        const userEntity = this.repository.create(user);
        return this.dtoMapper.toDto(userEntity);
    }
}

export default new CreateUser(usersRepo, UserDtoMapper);