import ProfileEntity from "../../../domain/profiles/entity/profileEntity.js";

class ProfileMapper {
  static toDomain(raw) {
    if (!raw) return null;
    return ProfileEntity.createEntity(raw.id, raw.userId, raw.phone, raw.bio);
  }

  static toPersistence(profile) {
    return {
      id: profile.id,
      userId: profile.userId,
      phone: profile.phone,
      bio: profile.bio,
    };
  }
}

export default ProfileMapper;
