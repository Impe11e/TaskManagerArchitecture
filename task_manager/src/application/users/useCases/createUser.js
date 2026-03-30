//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';
//import UserEntity from "../../../domain/users/entity/userEntity.js";
//import UserDtoMapper from "../dtoMapper/userDtoMapper.js";

class CreateUser {
    constructor(repository, userFabric) {
        this.repository = repository;
        this.userFabric = userFabric;
    }

    async execute(dto) {
        const user = this.userFabric.create(null, dto.username, dto.email, dto.password);

        return await this.repository.create(user);
    }
}

//export default new CreateUser(usersRepo, UserDtoMapper);
export default CreateUser