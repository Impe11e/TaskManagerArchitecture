import type { TQueryResponse } from "../../../application/profiles/applicationRequires/queryResponse/TResponse.js";

type ProfileResponseDto = {
  id: number;
  userId: number;
  phone: string;
  bio: string;
};

class ProfileDtoMapper {
  static toResponseDto(entity: TQueryResponse): ProfileResponseDto {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      phone: entity.phone.value,
      bio: entity.bio,
    };
  }
}

export default ProfileDtoMapper;
