import type NewUserEntity from "../../entity/newUserEntity.js";

export interface IFactory {
    create(username: string, email: string, password: string): Promise<NewUserEntity>;
}