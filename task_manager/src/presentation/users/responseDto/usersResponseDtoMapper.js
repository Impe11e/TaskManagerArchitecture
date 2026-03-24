class UserDtoMapper {
    static toResponseDto(entity) {
        return {
            id: entity.id,
            username: entity.username,
            email: entity.email,
        };
    }
}

export default UserDtoMapper