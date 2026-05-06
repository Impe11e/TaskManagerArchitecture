import {NotFoundError} from '../../errors/applicationErrors.js';
import type {IUserRepository} from '../../../domain/users/domainRequires/repo/IUserRepo.ts'
import type {IFindHandler} from '../applicationRequires/IHandles/IFindHandler.js';
import type {TUserEntity} from "../../../domain/users/domainRequires/application/TUserEntity.js";
import type {FindUserQuery} from "../applicationRequires/queries/findUserById.js";
import Id from "../../../domain/users/valueObjects/idObj.js";

class FindUserQueryHandler implements IFindHandler {
    private repository: IUserRepository

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    public async handle(command: FindUserQuery): Promise<TUserEntity> {
        const id = new Id(command.id);
        return await this._findUserOrFail(id)
    }

    private async _findUserOrFail(id: Id): Promise<TUserEntity> {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new NotFoundError('User with this id not found');
        }

        return user;
    }
}

//export default new FindUserById(usersRepo, UserDtoMapper);
export default FindUserQueryHandler