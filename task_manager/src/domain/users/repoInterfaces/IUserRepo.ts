import UserEntity from "../entity/userEntity.js";

export interface IUserRepository {
    create(entity: UserEntity): Promise<UserEntity>;

    update(entity: Partial<UserEntity>): Promise<UserEntity>;

    findById(id: number): Promise<UserEntity>;

    deleteById(id: number): Promise<boolean>;

    checkByUsername(username: string): Promise<boolean>;

    checkByEmail(email: string): Promise<boolean>;
}

