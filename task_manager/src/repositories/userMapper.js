import UserEntity from '../domain/users/userEntity.js';

class UserMapper {
    static toDomain(raw) {
        return UserEntity.createEntity(raw.id, raw.username, raw.email, raw.password);
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

export default UserMapper