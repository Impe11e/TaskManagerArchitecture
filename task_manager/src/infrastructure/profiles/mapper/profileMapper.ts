import ProfilesFactory from "../../../domain/profiles/factory/profilesFactory.js";
import ProfileEntity from "../../../domain/profiles/entity/profileEntity.js";
import NewProfileEntity from "../../../domain/profiles/entity/newProfileEntity.js";
import { TProfileModel } from "../../../domain/profiles/domainRequires/repo/TProfileModel.js";

class ProfileMapper {
  static toDomain(raw: TProfileModel): ProfileEntity {
    return ProfilesFactory.reconstitute(
      raw.id,
      raw.user_id,
      raw.phone,
      raw.bio,
    );
  }

  static toDataObjNewProfile(profile: NewProfileEntity) {
    return {
      user_id: profile.userId.value,
      phone: profile.phone.value,
      bio: profile.bio,
    };
  }

  static toDataObjProfile(profile: ProfileEntity) {
    return {
      id: profile.id.value,
      user_id: profile.userId.value,
      phone: profile.phone.value,
      bio: profile.bio,
    };
  }
}

export default ProfileMapper;
