import ProfilesFactory from "../../../domain/profiles/factory/profilesFactory.js";
import ProfileEntity from "../../../domain/profiles/entity/profileEntity.js";

type ProfileModel = {
  id: number;
  user_id: number;
  phone: string;
  bio: string;
};

class ProfileMapper {
  static toDomain(raw: ProfileModel): ProfileEntity {
    return ProfilesFactory.create(raw.id, raw.user_id, raw.phone, raw.bio);
  }

  static toPersistence(profile: ProfileEntity) {
    return {
      id: profile.id,
      user_id: profile.userId,
      phone: profile.phone,
      bio: profile.bio,
    };
  }
}

export default ProfileMapper;
