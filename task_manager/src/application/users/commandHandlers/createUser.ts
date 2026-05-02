import type {IUserRepository} from '../../../domain/users/domainRequires/repo/IUserRepo.ts'
import type {CreateUserCommand} from "../applicationRequires/commands/createUser.js";
import type {ICreateHandler} from '../applicationRequires/IHandles/ICreateHandle.js';
import type {IFactory} from "../../../domain/users/domainRequires/application/IFactory.js";

class CreateUserHandler implements ICreateHandler {
    private repository: IUserRepository
    private userFactory: IFactory

    constructor(repository: IUserRepository, userFactory: IFactory) {
        this.repository = repository;
        this.userFactory = userFactory;
    }

    public async handle(command: CreateUserCommand): Promise<{id: number}> {

        const userDM = await this.userFactory.create(command.username, command.email, command.password);
        const createdUser = await this.repository.create(userDM);

        return {id: createdUser.id.value}
    }
}

export default CreateUserHandler