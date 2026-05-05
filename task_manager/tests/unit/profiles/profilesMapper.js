import ProfilesFactory from "../../../dist/domain/profiles/factory/profilesFactory.js";

class ProfilesMapper {
  static toDomain(raw) {
    return ProfilesFactory.reconstitute(
      raw.id,
      raw.user_id,
      raw.phone,
      raw.bio,
    );
  }

  static toDataObjNewProfile(profile) {
    return {
      user_id: profile.userId.value,
      phone: profile.phone.value,
      bio: profile.bio,
    };
  }

  static toDataObjProfile(profile) {
    return {
      id: profile.id.value,
      user_id: profile.userId.value,
      phone: profile.phone.value,
      bio: profile.bio,
    };
  }
}

export default ProfilesMapper;
