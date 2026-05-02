import type {IUserRepository} from '../../../domain/users/domainRequires/repo/IUserRepo.ts'
import type {UpdateUserCommand} from "../applicationRequires/commands/updateUser.js";
import type {IUpdateHandler} from '../applicationRequires/IHandles/IUpdateHandler.js';
import type {TUserEntity} from "../../../domain/users/domainRequires/application/TUserEntity.js";
import type {IService} from "../../../domain/users/domainRequires/application/IService.js";
import {NotFoundError} from '../../errors/applicationErrors.js';
import Email from "../../../domain/users/valueObjects/emailObj.js";
import Username from "../../../domain/users/valueObjects/usernameObj.js";
import Password from "../../../domain/users/valueObjects/passwordObj.js";
import Id from "../../../domain/users/valueObjects/idObj.js";

class UpdateUserCommandHandler implements IUpdateHandler {
    private repository: IUserRepository
    private domainService: IService

    constructor(repository: IUserRepository, domainService: IService) {
        this.repository = repository;
        this.domainService = domainService;
    }

    public async handle(command: UpdateUserCommand): Promise<{id: number}> {

        const id = new Id(command.id);
        const userDM = await this._findUserOrFail(id)

        const email = command.email ? new Email(command.email) : undefined
        const username = command.username ? new Username(command.username) : undefined
        const password = command.password ? new Password(command.password) : undefined

        if (email) {
            await this.domainService.checkByEmail(email);
        }
        if (username) {
            await this.domainService.checkByUsername(username);
        }

        userDM.update({
            username: username,
            email: email,
            password: password
        })

        const updatedUser = await this.repository.update(userDM)

        return {id: updatedUser.id.value}
    }

    private async _findUserOrFail(id: Id): Promise<TUserEntity> {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new NotFoundError('User with this id not found');
        }

        return user
    }
}

//export default new UpdateUser(usersRepo, UserDtoMapper);
export default UpdateUserCommandHandler;