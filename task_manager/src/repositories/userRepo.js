import usersFactory from "../models/userModel.js";
import UserInterfaces from "../domain/users/UserInterfaces.js";
import UserMapper from "./userMapper.js";

class UsersRepo extends UserInterfaces{
    constructor(factory, mapper) {
        super();
        this.factory = factory;
        this.mapper = mapper;
        this.nextIndex = 1;
        this.users = new Map();
    }

    create(entity) {
        const userObj = this.mapper.toPersistence(entity);
        const {id, ...data} = userObj;

        const newUser = this.factory(this.nextIndex, data);
        this.users.set(this.nextIndex, newUser);
        this.nextIndex++;

        return this.mapper.toDomain(newUser)
    }


    update(entity) {
        const user = this.users.get(entity.id);
        if (!user) {
            return undefined;
        }

        const userObj = this.mapper.toPersistence(entity);
        this.users.set(userObj.id, userObj);

        return this.mapper.toDomain(userObj)
    }

    findById(id) {
        const userObj = this.users.get(id);
        return this.mapper.toDomain(userObj)
    }

    /*
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
     */

    deleteById(id) {
        return this.users.delete(id);
    }
}

export default new UsersRepo(usersFactory, UserMapper);