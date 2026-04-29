import UsersEntity from "../entity/userEntity.js";

class UsersFactory {
    static create(id: number | null, username: string, email: string, password: string): UsersEntity {
        return new UsersEntity(id, username, email, password);
    }
}

export default UsersFactory;