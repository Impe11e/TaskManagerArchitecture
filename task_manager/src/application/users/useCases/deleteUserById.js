//import usersRepo from '../../../infrastructure/users/repository/userRepo.js';

class DeleteUserById {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(dto) {
        const id = dto.id;
        return await this.repository.deleteById(id);
    }
}

//export default new DeleteUserById(usersRepo);
export default DeleteUserById;