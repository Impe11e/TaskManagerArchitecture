type UserEntityLike = {
    id: number,
    username: string,
    password: string,
    email: string
}

export interface IUserRepository {
    create(entity: UserEntityLike): Promise<UserEntityLike>;

    update(entity: Partial<UserEntityLike>): Promise<UserEntityLike>;

    findById(id: number): Promise<UserEntityLike>;

    deleteById(id: number): Promise<boolean>;

    checkByUsername(username: string): Promise<boolean>;

    checkByEmail(email: string): Promise<boolean>;
}

