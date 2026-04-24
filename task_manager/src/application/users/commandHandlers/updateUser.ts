import type {IUserRepository} from '../../../domain/users/domainRequires/repo/IUserRepo.ts'
import type {UpdateUserCommand} from "../applicationRequires/commands/updateUser.js";
import type {IUpdateHandler} from '../applicationRequires/IUpdateHandler.js';
import type {TUserEntity} from "../../../domain/users/domainRequires/application/TUserEntity.js";
import type {IService} from "../../../domain/users/domainRequires/application/IService.js";
import {NotFoundError} from '../../errors/applicationErrors.js';

class UpdateUserCommandHandler implements IUpdateHandler {
    private repository: IUserRepository
    private domainService: IService

    constructor(repository: IUserRepository, domainService: IService) {
        this.repository = repository;
        this.domainService = domainService;
    }

    async handle(command: UpdateUserCommand): Promise<{id: number}> {
        const userDM: TUserEntity = await this._findUserOrFail(command.id)

        if (command.email) {
            await this.domainService.checkByEmail(command.email);
        }
        if (command.username) {
            await this.domainService.checkByUsername(command.username);
        }

        userDM.update({
            username: command.username,
            email: command.email,
            password: command.password
        })

        const updatedUser: TUserEntity = await this.repository.update(userDM)

        return {id: updatedUser.id}
    }

    async _findUserOrFail(id: number): Promise<TUserEntity> {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new NotFoundError('User with this id not found');
        }

        return user
    }
}

//export default new UpdateUser(usersRepo, UserDtoMapper);
export default UpdateUserCommandHandler;