import type {TUserEntity} from "./TUserEntity.js";
import type {TNewUserEntity} from "./TNewUserEntity.js";
import Email from "../../valueObjects/emailObj.js";
import Username from "../../valueObjects/usernameObj.js";
import Id from "../../valueObjects/idObj.js";

export interface IUserRepository {
    create(entity: TNewUserEntity): Promise<TUserEntity>;

    update(entity: TUserEntity): Promise<TUserEntity>;

    findById(id: Id): Promise<TUserEntity | null>;

    deleteById(id: Id): Promise<boolean>;

    checkByUsername(username: Username): Promise<boolean>;

    checkByEmail(email: Email): Promise<boolean>;
}

