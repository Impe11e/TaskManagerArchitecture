import userRepo from '../repositories/userRepo.js';

class UserService {
    constructor(repository) {
        this.repository = repository;
    }

    #checkUserUnique(data){
        const userByEmail = this.repository.findUserByEmail(data.email);
        if (userByEmail) throw new Error('User with this email already exists');
        const userByUsername = this.repository.findUserByUsername(data.username);
        if (userByUsername) throw new Error('User with this username already exists');
    }

    #checkUserExists(id){
        const user = this.repository.findUserById(id);
        if (!user) throw new Error('User with this ID doesnt exist');
    }

    createUser(data) {
        this.#checkUserUnique(data);

        return this.repository.createUser(data);
    }

    updateUser(id,data) {
        this.#checkUserUnique(data);
        this.#checkUserExists(id);

        return this.repository.updateUser(id,data);
    }

    findUserById(id) {
        return this.repository.findUserById(id)
    }

    deleteUserById(id) {
        this.#checkUserExists(id);

        return this.repository.deleteUserById(id)
    }
}

export default new UserService(userRepo);