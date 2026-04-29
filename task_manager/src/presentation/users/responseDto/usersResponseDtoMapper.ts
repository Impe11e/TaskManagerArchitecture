import type {TQueryResponse} from "../../../application/users/applicationRequires/queryResponse/TResponse.js";

type UserResponseDto = {
    id: number,
    username: string,
    email: string
}

class UserDtoMapper {
    static toResponseDto(entity: TQueryResponse): UserResponseDto {
        return {
            id: entity.id,
            username: entity.username,
            email: entity.email,
        };
    }
}

export default UserDtoMapper