import userFactory from "../models/userModel.js";

class UserRepo {
    constructor(factory) {
        this.factory = factory;
        this.nextIndex = 0;
        this.users = [];
    }

    createUser(data) {
        const newUser = this.factory(this.nextIndex, data);
        this.nextIndex++;
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id, data) {
        const user = this.users[id];
        const updatedUser = { ...user, ...data };
        this.users[id] = updatedUser;
        return updatedUser;
    }

    findUserById(id) {
        return this.users[id]
    }

    deleteUserById(id) {
        return this.users.splice(id, 1);
    }
}

export default new UserRepo(userFactory);