import type {TUserEntity} from "./TUserEntity.js";

export interface IUserRepository {
    create(entity: TUserEntity): Promise<TUserEntity>;

    update(entity: TUserEntity): Promise<TUserEntity>;

    findById(id: number): Promise<TUserEntity>;

    deleteById(id: number): Promise<boolean>;

    checkByUsername(username: string): Promise<boolean>;

    checkByEmail(email: string): Promise<boolean>;
}

