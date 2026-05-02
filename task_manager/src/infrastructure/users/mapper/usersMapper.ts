import UsersFactory from '../../../domain/users/factory/usersFactory.js';
import type {TUserModel} from "../../../domain/users/domainRequires/repo/TUserModel.js";
import type {TNewUserEntity} from "../../../domain/users/domainRequires/repo/TNewUserEntity.js";
import type {TUserEntity} from "../../../domain/users/domainRequires/repo/TUserEntity.js";
import type {TNewUserModel} from "../../../domain/users/domainRequires/repo/TNewUserModel.js";



class UsersMapper {
    static toDomain(raw: TUserModel): TUserEntity {
        return UsersFactory.reconstitute(raw.id, raw.username, raw.email, raw.password);
    }

    static toDataObjNewUser(user: TNewUserEntity): TNewUserModel {
        return {
            username: user.username.value,
            email: user.email.value,
            password: user.password.value,
        };
    }

    static toDataObjUser(user: TUserEntity): TUserModel {
        return {
            id: user.id.value,
            username: user.username.value,
            email: user.email.value,
            password: user.password.value,
        };
    }

}

export default UsersMapper