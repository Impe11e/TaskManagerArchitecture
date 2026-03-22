import usersRepo from '../../repositories/userRepo.js';

class FindUserById {
    constructor(repository) {
        this.repository = repository;
    }

    execute(dto) {
        const id = dto.id;
        return this.repository.findById(id);
    }
}

export default new FindUserById(usersRepo);