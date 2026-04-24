import UsersEntity from "../../entity/userEntity.js";

export interface IFactory {
    create(id: number, username: string, email: string, password: string): UsersEntity;
}