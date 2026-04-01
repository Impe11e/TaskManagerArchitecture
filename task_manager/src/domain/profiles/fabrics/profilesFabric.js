import ProfileEntity from "../entity/profileEntity.js";

class ProfilesFabric {
  static create(id, userId, phone, bio) {
    return new ProfileEntity(id, userId, phone, bio);
  }
}

export default ProfilesFabric;
