//import usersFactory from "../models/userModel.js";
import UserRepo from "../../../domain/users/repoInterfaces/userRepo.js";
//import UserMapper from "../mapper/userMapper.js";
//import pool from "../../pool.js";

class UsersRepository extends UserRepo{
    constructor(factory, mapper, pool) {
        super();
        this.factory = factory;
        this.mapper = mapper;
        this.pool = pool;
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

    deleteById(id) {
        return this.users.delete(id);
    }

}

//export default new UsersRepo(usersFactory, UserMapper, pool);
export default UsersRepository;