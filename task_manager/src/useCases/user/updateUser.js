import usersRepo from '../../repositories/userRepo.js';

class UpdateUser {
    constructor(repository) {
        this.repository = repository;
    }

    execute(dto) {
        const {id, ...data} = dto;
        const user = this.repository.findById(id)
        user.update({
            username: data.username,
            email: data.email,
            password: data.password
        })

        return this.repository.update(user);
    }
}

export default new UpdateUser(usersRepo);