import usersRepo from '../../repositories/userRepo.js';
import UserEntity from "../../domain/users/userEntity.js";

class CreateUser {
    constructor(repository) {
        this.repository = repository;
    }

    execute(dto) {
        const user = UserEntity.createEntity(dto.id, dto.username, dto.email, dto.password);
        return this.repository.create(user);
    }
}

export default new CreateUser(usersRepo);