import usersRepo from '../../../infrastructure/repositories/userRepo.js';

class DeleteUserById {
    constructor(repository) {
        this.repository = repository;
    }

    execute(dto) {
        const id = dto.id;
        return this.repository.deleteById(id);
    }
}

export default new DeleteUserById(usersRepo);