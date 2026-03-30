import UserEntity from "../entity/userEntity.js";

class UserFabric {
    static create(id, username, email, password) {
        return new UserEntity(id, username, email, password);
    }
}

export default UserFabric;