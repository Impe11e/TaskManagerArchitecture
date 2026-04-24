import type {IUserRepository} from '../../../domain/users/domainRequires/repo/IUserRepo.ts'
import type {CreateUserCommand} from "../applicationRequires/commands/createUser.js";
import type {ICreateHandler} from '../applicationRequires/ICreateHandle.js';
import type {IFactory} from "../../../domain/users/domainRequires/application/IFactory.js";
import type {IService} from "../../../domain/users/domainRequires/application/IService.js";

class CreateUserHandler implements ICreateHandler {
    private repository: IUserRepository
    private userFactory: IFactory
    private domainService: IService

    constructor(repository: IUserRepository, userFactory: IFactory, domainService: IService) {
        this.repository = repository;
        this.userFactory = userFactory;
        this.domainService = domainService;
    }

    async handle(command: CreateUserCommand): Promise<{id: number}> {
        await this.domainService.checkByEmail(command.email);
        await this.domainService.checkByUsername(command.username);

        const userDM = this.userFactory.create(null, command.username, command.email, command.password);
        const createdUser = await this.repository.create(userDM);

        return {id: createdUser.id}
    }
}

export default CreateUserHandler