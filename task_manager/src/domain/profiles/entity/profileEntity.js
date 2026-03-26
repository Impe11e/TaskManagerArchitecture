import { DomainError } from "../errors/profileErrors.js";

class ProfileEntity {
  constructor(id, userId, phone, bio, cKey) {
    if (cKey !== ProfileEntity.#key) {
      throw new Error("Can't create a new profile entity with constructor");
    }
    this.id = id;
    this.userId = userId;
    this.phone = phone;
    this.bio = bio;
  }

  static #key = Symbol("profileKey");

  static _validatePhone(phone) {
    if (!phone || !phone.startsWith("+380")) {
      throw new DomainError(
        "Business logic violated: phone must be a valid UA format.",
      );
    }
  }

  static createEntity(id, userId, phone, bio) {
    this._validatePhone(phone);
    return new ProfileEntity(id, userId, phone, bio, ProfileEntity.#key);
  }

  static createEntityWithoutId(userId, phone, bio) {
    this._validatePhone(phone);
    return new ProfileEntity(null, userId, phone, bio, ProfileEntity.#key);
  }

  update({ phone, bio }) {
    if (phone !== undefined) {
      ProfileEntity._validatePhone(phone);
      this.phone = phone;
    }
    if (bio !== undefined) {
      this.bio = bio;
    }
  }
}
export default ProfileEntity;
