class ProfileResponseDtoMapper {
  static toResponseDto(entity) {
    return {
      id: entity.id,
      userId: entity.userId,
      phone: entity.phone,
      bio: entity.bio,
    };
  }
}

export default ProfileResponseDtoMapper;
