//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';
//import UserEntity from "../../../domain/users/entity/userEntity.js";
//import UserDtoMapper from "../dtoMapper/userDtoMapper.js";

class CreateUser {
    constructor(repository, userEntity) {
        this.repository = repository;
        this.userEntity = userEntity;
    }

    async execute(dto) {
        const user = this.userEntity.createEntityWithoutId(dto.username, dto.email, dto.password);

        return await this.repository.create(user);
    }
}

//export default new CreateUser(usersRepo, UserDtoMapper);
export default CreateUser