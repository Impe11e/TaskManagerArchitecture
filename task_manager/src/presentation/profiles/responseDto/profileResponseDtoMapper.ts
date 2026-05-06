import type { TProfileEntity } from "../../../domain/profiles/domainRequires/application/TProfileEntity.js";

class ProfileDtoMapper {
  static toResponseDto(entity: TProfileEntity) {
    return {
      id: entity.id,
      userId: entity.userId,
      phone: entity.phone,
      bio: entity.bio,
    };
  }
}

export default ProfileDtoMapper;
