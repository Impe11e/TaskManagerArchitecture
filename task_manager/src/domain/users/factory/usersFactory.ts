import UsersEntity from "../entity/userEntity.js";
import UsersDomainService from "../service/usersDomainService.js";

class UsersFactory {
    static create(id: number | null, username: string, email: string, password: string): UsersEntity {
        return new UsersEntity(id, username, email, password);
    }
}

export default UsersFactory;