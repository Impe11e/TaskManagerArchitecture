import {DomainError} from "../../tools/errors/customErrors.js";

class UserEntity {
    constructor(id, username, email, password, cKey) {

        if (cKey !== UserEntity.#key){
            throw new Error("Can`t create a new user entity with constructor");
        }

        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    static #key = Symbol('key101')

    static _validateId(id) {
        if (id <= 0){
            throw new DomainError('Business logic violated: id should be greater than 0.');
        }
    }

    static _validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new DomainError('Business logic violated: email has invalid format.');
        }
    }

    static _validateUsername(username) {
        if (username.length <= 5) {
            throw new DomainError('Business logic violated: username is too short.');
        }

        if (username.length >= 20) {
            throw new DomainError('Business logic violated: username is too long.');
        }
    }

    static _validatePassword(password) {
        if (password.length <= 8) {
            throw new DomainError('Business logic violated: password is too short.');
        }

        if (password.length >= 30) {
            throw new DomainError('Business logic violated: password is too long.');
        }
    }

    static createEntity(id, username, email, password) {
        this._validateId(id)
        this._validateEmail(email)
        this._validateUsername(username)
        this._validatePassword(password)

        return new UserEntity(id, username, email, password, UserEntity.#key);
    }

    static createEntityWithoutId(username, email, password) {
        this._validateEmail(email)
        this._validateUsername(username)
        this._validatePassword(password)

        return new UserEntity(null, username, email, password, UserEntity.#key);
    }

    update({username, email, password}) {
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
console.log()
export default UserEntity;