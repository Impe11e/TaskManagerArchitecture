import userRepo from '../repositories/userRepo.js';

class UserService {
    constructor(repository) {
        this.repository = repository;
    }

    #checkUserUnique(data){
        const userByEmail = this.repository.findByEmail(data.email);
        if (userByEmail) throw new Error('User with this email already exists');
        const userByUsername = this.repository.findByUsername(data.username);
        if (userByUsername) throw new Error('User with this username already exists');
    }

    #checkUserExists(id){
        const user = this.repository.findById(id);
        if (!user) throw new Error('User with this ID doesnt exist');
    }

    create(data) {
        this.#checkUserUnique(data);

        return this.repository.create(data);
    }

    update(id, data) {
        this.#checkUserUnique(data);
        this.#checkUserExists(id);

        return this.repository.update(id,data);
    }

    findById(id) {
        this.#checkUserExists(id);

        return this.repository.findById(id)
    }

    deleteById(id) {
        this.#checkUserExists(id);

        return this.repository.deleteById(id)
    }
}

export default new UserService(userRepo);