import ProfileEntity from "../entity/profileEntity.js";

class ProfilesFactory {
  static create(
    id: number | null,
    userId: number,
    phone: string,
    bio: string,
  ): ProfileEntity {
    return new ProfileEntity(id, userId, phone, bio);
  }
}

export default ProfilesFactory;
