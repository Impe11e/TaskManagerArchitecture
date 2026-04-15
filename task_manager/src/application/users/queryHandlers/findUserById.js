import {NotFoundError} from '../../errors/applicationErrors.js';

class FindUserQueryHandler {
    constructor(repository) {
        this.repository = repository;
    }

    async handle(command) {
        const id = command.id;
        return await this._findUserOrFail(id)
    }

    async _findUserOrFail(id) {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new NotFoundError('User with this id not found');
        }

        return user;
    }
}

//export default new FindUserById(usersRepo, UserDtoMapper);
export default FindUserQueryHandler