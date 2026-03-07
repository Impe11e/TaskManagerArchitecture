import userRepo from '../repositories/userRepo.js';

class UserService {
    constructor(repository) {
        this.repository = repository;
    }

    #checkUnique(data, id = null){
        const userByEmail = this.repository.findByEmail(data.email);
        if (userByEmail && userByEmail.id !== id)
            throw new Error('User with this email already exists');
        const userByUsername = this.repository.findByUsername(data.username);
        if (userByUsername && userByUsername.id !== id)
            throw new Error('User with this username already exists');
    }

    #checkExists(id){
        const user = this.repository.findById(id);
        if (!user) throw new Error('User with this ID doesnt exist');
    }

    create(data) {
        this.#checkUnique(data);

        return this.repository.create(data);
    }

    update(id, data) {
        this.#checkExists(id);
        this.#checkUnique(data, id);

        return this.repository.update(id,data);
    }

    findById(id) {
        const user = this.repository.findById(id);
        if (!user) throw new Error('User with this ID doesnt exist');

        return user
    }

    deleteById(id) {
        this.#checkExists(id);

        return this.repository.deleteById(id);
    }
}

export default new UserService(userRepo);