import {NotFoundError} from '../../errors/applicationErrors.js';
import type {IUserRepository} from '../../../domain/users/repoInterfaces/IUserRepo.ts'
import type {IHandler} from '../IHandler.js';
import UserEntity from "../../../domain/users/entity/userEntity.js"
import type {FindUserQuery} from "../queries/findUserById.js";

class FindUserQueryHandler implements IHandler<FindUserQuery, UserEntity> {
    private repository: IUserRepository

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    async handle(command: FindUserQuery) {
        const id = command.id;
        return await this._findUserOrFail(id)
    }

    async _findUserOrFail(id: number) {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new NotFoundError('User with this id not found');
        }

        return user;
    }
}

//export default new FindUserById(usersRepo, UserDtoMapper);
export default FindUserQueryHandler