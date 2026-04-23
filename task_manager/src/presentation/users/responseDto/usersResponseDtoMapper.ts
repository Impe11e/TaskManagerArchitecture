import type UserEntity from "../../../domain/users/entity/userEntity.js";

type UserResponseDto = {
    id: number,
    username: string,
    email: string
}

class UserDtoMapper {
    static toResponseDto(entity: UserEntity): UserResponseDto {
        return {
            id: entity.id,
            username: entity.username,
            email: entity.email,
        };
    }
}

export default UserDtoMapper