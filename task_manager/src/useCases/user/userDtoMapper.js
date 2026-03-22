class UserDtoMapper {
    static toDto(entity) {
        return {
            id: entity.id,
            username: entity.username,
            email: entity.email,
            password: entity.password,
        };
    }
}

export default UserDtoMapper