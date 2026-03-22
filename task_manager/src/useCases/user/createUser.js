import usersRepo from '../../repositories/userRepo.js';

class CreateUser {
    constructor(repository) {
        this.repository = repository;
    }

    execute(dto) {
        return this.repository.create(dto);
    }
}

export default new CreateUser(usersRepo);