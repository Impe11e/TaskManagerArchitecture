import usersRepo from '../repositories/userRepo.js';
import {ConflictError, NotFoundError, ForbiddenError} from "../errors/customErrors.js";


class UsersService {
    constructor(repository) {
        this.repository = repository;
    }

    #checkUnique(data, id = null){
        const userByEmail = this.repository.findByEmail(data.email);
        if (userByEmail && userByEmail.id !== id)
            throw new ConflictError('User with this email already exists');
        const userByUsername = this.repository.findByUsername(data.username);
        if (userByUsername && userByUsername.id !== id)
            throw new ConflictError('User with this username already exists');
    }

    #checkExists(id){
        const user = this.repository.findById(id);
        if (!user) throw new NotFoundError('User with this ID doesnt exist');
    }

    create(data) {
        this.#checkUnique(data);

        return this.repository.create(data);
    }

    update(id, data) {
        this.#checkExists(id);
        this.#checkUnique(data, id);

        if(data.id)
            throw new ForbiddenError('Impossible to manually update users id');

        return this.repository.update(id,data);
    }

    findById(id) {
        const user = this.repository.findById(id);
        if (!user) throw new NotFoundError('User with this ID doesnt exist');

        return user
    }

    deleteById(id) {
        this.#checkExists(id);

        return this.repository.deleteById(id);
    }
}

export default new UsersService(usersRepo);