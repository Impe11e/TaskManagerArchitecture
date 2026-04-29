import type {TUserEntity} from "./TUserEntity.js";
import type {TRepoResponse} from "./TRepoResponse.js";

export interface IUserRepository {
    create(entity: TUserEntity): Promise<TRepoResponse>;

    update(entity: TUserEntity): Promise<TRepoResponse>;

    findById(id: number): Promise<TRepoResponse | null>;

    deleteById(id: number): Promise<boolean>;

    checkByUsername(username: string): Promise<boolean>;

    checkByEmail(email: string): Promise<boolean>;
}

