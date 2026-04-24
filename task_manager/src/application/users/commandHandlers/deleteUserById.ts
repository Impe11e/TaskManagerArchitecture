//import usersRepo from '../../../infrastructure/users/repository/usersRepo.js';
import type {IUserRepository} from '../../../domain/users/domainRequires/repo/IUserRepo.ts'
import type {DeleteUserCommand} from "../applicationRequires/commands/deleteUserById.js";
import type {IDeleteHandler} from '../applicationRequires/IDeleteHandler.js';

import {NotFoundError} from '../../errors/applicationErrors.js';

class DeleteUserCommandHandler implements IDeleteHandler {
    private repository: IUserRepository

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    public async handle(command: DeleteUserCommand): Promise<boolean> {
        const id = command.id;
        await this._findUserOrFail(id)

        //returns true if succeed
        return await this.repository.deleteById(id);
    }

    private async _findUserOrFail(id: number) {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new NotFoundError('User with this id not found');
        }
    }
}

//export default new DeleteUserById(usersRepo);
export default DeleteUserCommandHandler;