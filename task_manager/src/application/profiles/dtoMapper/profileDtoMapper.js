class ProfileDtoMapper {
  static toDto(entity) {
    return {
      id: entity.id,
      userId: entity.userId,
      phone: entity.phone,
      bio: entity.bio,
    };
  }
}
export default ProfileDtoMapper;
