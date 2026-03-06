import userFactory from "../models/userModel.js";

class UserRepo {
    constructor(factory) {
        this.factory = factory;
        this.nextIndex = 0;
        this.users = new Map();
    }

    createUser(data) {
        const newUser = this.factory(this.nextIndex, data);
        this.users.set(this.nextIndex, newUser);
        this.nextIndex++;
        return newUser;
    }

    updateUser(id, data) {
        const user = this.users.get(id);

        if (!user) {
            return undefined;
        }

        const updatedUser = { ...user, ...data };
        this.users.set(id, updatedUser);
        return updatedUser;
    }

    findUserById(id) {
        return this.users.get(id)
    }

    findUserByEmail(email) {
        for (const user of this.users.values()){
            if (user.email === email){
                return user;
            }
        }
        return undefined;
    }

    findUserByUsername(username) {
        for (const user of this.users.values()){
            if (user.username === username){
                return user;
            }
        }
        return undefined;
    }

    deleteUserById(id) {
        return this.users.delete(id);
    }
}

export default new UserRepo(userFactory);