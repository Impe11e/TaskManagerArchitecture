import userFactory from "../models/userModel.js";

class UserRepo {
    constructor(factory) {
        this.factory = factory;
        this.nextIndex = 0;
        this.users = new Map();
    }

    create(data) {
        const newUser = this.factory(this.nextIndex, data);
        this.users.set(this.nextIndex, newUser);
        this.nextIndex++;
        return newUser;
    }

    update(id, data) {
        const user = this.users.get(id);

        if (!user) {
            return undefined;
        }

        const updatedUser = { ...user, ...data };
        this.users.set(id, updatedUser);
        return updatedUser;
    }

    findById(id) {
        return this.users.get(id)
    }

    findByEmail(email) {
        for (const user of this.users.values()){
            if (user.email === email){
                return user;
            }
        }
        return undefined;
    }

    findByUsername(username) {
        for (const user of this.users.values()){
            if (user.username === username){
                return user;
            }
        }
        return undefined;
    }

    deleteById(id) {
        return this.users.delete(id);
    }
}

export default new UserRepo(userFactory);