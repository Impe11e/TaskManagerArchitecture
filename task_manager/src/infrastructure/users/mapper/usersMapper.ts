import UsersFactory from '../../../domain/users/factory/usersFactory.js';
import UserEntity from "../../../domain/users/entity/userEntity.js";
import type {TRepoResponse} from "../../../domain/users/domainRequires/repo/TRepoResponse.js";
type UserModel = Pick<UserEntity, "id" | "username" | "email" | "password">;

class UsersMapper {
    static toDomain(raw: UserModel): TRepoResponse {
        return UsersFactory.create(raw.id, raw.username, raw.email, raw.password);
    }

    static toPersistence(user: UserEntity): UserModel {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
        };
    }
}

export default UsersMapper