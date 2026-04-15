import UsersFactory from "../../../domain/users/factory/usersFactory.js";

class UsersMapper {
    static toDomain(raw) {
        return UsersFactory.create(raw.id, raw.username, raw.email, raw.password);
    }

    static toPersistence(user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
        };
    }
}

export default UsersMapper