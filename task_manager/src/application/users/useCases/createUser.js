//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';
//import UserEntity from "../../../domain/users/entity/userEntity.js";
//import UserDtoMapper from "../dtoMapper/userDtoMapper.js";

class CreateUser {
    constructor(repository, userFabric, domainService) {
        this.repository = repository;
        this.userFabric = userFabric;
        this.domainService = domainService;
    }

    async execute(dto) {
        await this.domainService.checkByEmail(dto.email);
        await this.domainService.checkByUsername(dto.username);

        const user = this.userFabric.create(null, dto.username, dto.email, dto.password);

        return await this.repository.create(user);
    }
}

//export default new CreateUser(usersRepo, UserDtoMapper);
export default CreateUser