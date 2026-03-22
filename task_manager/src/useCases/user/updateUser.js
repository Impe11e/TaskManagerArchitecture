import usersRepo from '../../repositories/userRepo.js';

class UpdateUser {
    constructor(repository) {
        this.repository = repository;
    }

    execute(dto) {
        const {id, ...data} = dto;

        return this.repository.update(id, data);
    }
}

export default new UpdateUser(usersRepo);