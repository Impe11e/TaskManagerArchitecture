import type {TUserEntity} from "../../../domain/users/domainRequires/repo/TUserEntity.js";
import type {IUserRepository} from '../../../domain/users/domainRequires/repo/IUserRepo.ts'
import type {DeleteUserCommand} from "../applicationRequires/commands/deleteUserById.js";
import type {IDeleteHandler} from '../applicationRequires/IHandles/IDeleteHandler.js';
import type {IAuditService} from "../../../modules/audit/IAuditService.js";
import {NotFoundError} from '../../errors/applicationErrors.js';
import Id from "../../../domain/users/valueObjects/idObj.js";
import EventUserDeleted from "../events/deleted.js";

class DeleteUserCommandHandler implements IDeleteHandler {
    private repository: IUserRepository
    private auditService: IAuditService

    constructor(repository: IUserRepository, auditService: IAuditService) {
        this.repository = repository;
        this.auditService = auditService;
    }

    public async handle(command: DeleteUserCommand): Promise<boolean> {
        const id = new Id(command.id);

        const user = await this._findUserOrFail(id)

        //returns true if succeed
        const isDeleted = await this.repository.deleteById(id);

        if (isDeleted) {
            this.auditService.log(new EventUserDeleted(user));
        }

        return isDeleted
    }

    private async _findUserOrFail(id: Id) {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new NotFoundError('User with this id not found');
        }

        return user;
    }
}

//export default new DeleteUserById(usersRepo);
export default DeleteUserCommandHandler;