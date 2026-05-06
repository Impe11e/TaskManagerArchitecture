import UsersFactory from '../../../dist/domain/users/factory/usersFactory.js';
class UsersMapper {
    static toDomain(raw) {
        return UsersFactory.reconstitute(raw.id, raw.username, raw.email, raw.password);
    }
    static toDataObjNewUser(user) {
        return {
            username: user.username.value,
            email: user.email.value,
            password: user.password.value,
        };
    }
    static toDataObjUser(user) {
        return {
            id: user.id.value,
            username: user.username.value,
            email: user.email.value,
            password: user.password.value,
        };
    }
}
export default UsersMapper;
//# sourceMappingURL=usersMapper.js.map