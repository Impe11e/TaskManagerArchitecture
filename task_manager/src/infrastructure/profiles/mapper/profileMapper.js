import ProfilesFabric from "../../../domain/profiles/fabrics/profilesFabric.js";

class ProfileMapper {
  static toDomain(raw) {
    if (!raw) return null;
    return ProfilesFabric.create(
      raw.id,
      raw.user_id || raw.userId,
      raw.phone,
      raw.bio,
    );
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
