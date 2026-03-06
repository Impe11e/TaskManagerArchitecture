import userRepo from '../repositories/userRepo.js';

class UserService {
    constructor(repository) {
        this.repository = repository;
    }

    createUser(data) {
        return this.repository.createUser(data);
    }

    updateUser(id,data) {
        return this.repository.updateUser(id,data);
    }

    findUserById(id) {
        return this.repository.findUserById(id)
    }

    deleteUserById(id) {
        return this.repository.deleteUserById(id)
    }
}

export default new UserService(userRepo);