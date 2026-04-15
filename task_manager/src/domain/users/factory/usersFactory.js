import UsersEntity from "../entity/userEntity.js";

class UsersFactory {
    static create(id, username, email, password) {
        return new UsersEntity(id, username, email, password);
    }
}

export default UsersFactory;