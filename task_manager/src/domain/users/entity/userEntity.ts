import {InvariantError} from "../../errors/domainErrors.js";
import type {TUserEntity} from "../domainRequires/repo/TUserEntity.js";

type UpdateObjType = {
    username: string,
    email: string,
    password: string
}

class UserEntity {
    public id: number;
    public email: string;
    public username: string;
    public password: string;

    constructor(id: number, username: string, email: string, password: string) {
        UserEntity._validateInConstructor(id, username, email, password);

        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    static _validateId(id: number): void {
        if (id <= 0) {
            throw new InvariantError('Business logic violated: id should be greater than 0.');
        }
    }

    static _validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new InvariantError('Business logic violated: email has invalid format.');
        }
    }

    static _validateUsername(username: string): void {
        if (username.length <= 5) {
            throw new InvariantError('Business logic violated: username is too short.');
        }

        if (username.length >= 20) {
            throw new InvariantError('Business logic violated: username is too long.');
        }
    }

    static _validatePassword(password: string): void {
        if (password.length <= 8) {
            throw new InvariantError('Business logic violated: password is too short.');
        }

        if (password.length >= 30) {
            throw new InvariantError('Business logic violated: password is too long.');
        }
    }

    static _validateInConstructor(id: number, username: string, email: string, password: string): void {
        if (id) {
            UserEntity._validateId(id)
        }
        UserEntity._validateUsername(username)
        UserEntity._validateEmail(email)
        UserEntity._validatePassword(password);
    }

    public update({username, email, password}: UpdateObjType): void {
        if (username !== undefined) {
            UserEntity._validateUsername(username);
            this.username = username;
        }
        console.log(username, email, password);
        if (email !== undefined) {
            UserEntity._validateEmail(email);
            this.email = email;
        }

        if (password !== undefined) {
            UserEntity._validatePassword(password);
            this.password = password;
        }
    }
}

export default UserEntity;