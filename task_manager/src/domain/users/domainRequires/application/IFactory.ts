import UsersEntity from "../../entity/userEntity.js";

export interface IFactory {
    create(id: number | null, username: string, email: string, password: string): UsersEntity;
}