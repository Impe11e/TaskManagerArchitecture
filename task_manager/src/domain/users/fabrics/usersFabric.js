import UsersEntity from "../entity/userEntity.js";

class UsersFabric {
    static create(id, username, email, password) {
        return new UsersEntity(id, username, email, password);
    }
}

export default UsersFabric;