import type {IUserRepository} from '../../../domain/users/repoInterfaces/IUserRepo.ts'
import type {CreateUserCommand} from "../commands/createUser.js";
import type {IFactory} from "../../../domain/users/IFactory.js";
import type {IHandler} from '../IHandler.js';
import type {IService} from "../../../domain/users/IService.js";

class CreateUserHandler implements IHandler<CreateUserCommand, {id: number}>{
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