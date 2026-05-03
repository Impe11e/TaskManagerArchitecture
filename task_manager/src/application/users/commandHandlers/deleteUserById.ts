import type {TUserEntity} from "../../../domain/users/domainRequires/repo/TUserEntity.js";
import type {IUserRepository} from '../../../domain/users/domainRequires/repo/IUserRepo.ts'
import type {DeleteUserCommand} from "../applicationRequires/commands/deleteUserById.js";
import type {IDeleteHandler} from '../applicationRequires/IHandles/IDeleteHandler.js';
import type {IAuditService} from "../../../modules/audit/IAuditService.js";
import {NotFoundError} from '../../errors/applicationErrors.js';
import Id from "../../../domain/users/valueObjects/idObj.js";

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

        const isDeleted = await this.repository.deleteById(id);

        if (isDeleted) {
            this.logEvent(user)
        }

        //returns true if succeed
        return isDeleted
    }

    private async _findUserOrFail(id: Id) {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new NotFoundError('User with this id not found');
        }

        return user;
    }

    private logEvent(user: TUserEntity) {
        this.auditService.log({
            operation: "Deleting User",
            entityId: user.id.value,
            payload: {
                username: user.username.value,
                email: user.email.value
            },
            occurredAt: new Date()
        })
    }
}

//export default new DeleteUserById(usersRepo);
export default DeleteUserCommandHandler;