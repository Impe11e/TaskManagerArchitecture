import type {TQueryResponse} from "../../../application/users/applicationRequires/queryResponse/TResponse.js";

type UserResponseDto = {
    id: number,
    username: string,
    email: string
}

class UserDtoMapper {
    static toResponseDto(entity: TQueryResponse): UserResponseDto {
        return {
            id: entity.id.value,
            username: entity.username.value,
            email: entity.email.value,
        };
    }
}

export default UserDtoMapper