import type {IUserRepository} from '../../../domain/users/repoInterfaces/IUserRepo.ts'
import type {UpdateUserCommand} from "../commands/updateUser.js";
import UserEntity from "../../../domain/users/entity/userEntity.js"
import type {IHandler} from '../IHandler.js';
import type {IService} from "../../../domain/users/IService.js";
import {NotFoundError} from '../../errors/applicationErrors.js';

class UpdateUserCommandHandler implements IHandler<UpdateUserCommand, {id: number}>  {
    private repository: IUserRepository
    private domainService: IService

    constructor(repository: IUserRepository, domainService: IService) {
        this.repository = repository;
        this.domainService = domainService;
    }

    async handle(command: UpdateUserCommand): Promise<{id: number}> {
        const userDM: UserEntity = await this._findUserOrFail(command.id)

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

        const updatedUser: UserEntity = await this.repository.update(userDM)

        return {id: updatedUser.id}
    }

    async _findUserOrFail(id: number): Promise<UserEntity> {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new NotFoundError('User with this id not found');
        }

        return user
    }
}

//export default new UpdateUser(usersRepo, UserDtoMapper);
export default UpdateUserCommandHandler;