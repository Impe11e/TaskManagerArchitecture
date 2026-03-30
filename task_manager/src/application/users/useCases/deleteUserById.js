//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';

class DeleteUserById {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(dto) {
        const id = dto.id;
        await this._findUserOrFail(id)
        return await this.repository.deleteById(id);
    }

    async _findUserOrFail(id) {
        const user = await this.repository.findById(id)

        if(!user) {
            throw new Error('User not found');
        }
    }
}

//export default new DeleteUserById(usersRepo);
export default DeleteUserById;