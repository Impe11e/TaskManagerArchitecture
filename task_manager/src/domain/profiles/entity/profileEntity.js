import { InvariantError } from "../../errors/domainErrors.js";

class ProfileEntity {
  constructor(id, userId, phone, bio) {
    ProfileEntity._validateInConstructor(id, userId, phone);

    this.id = id;
    this.userId = userId;
    this.phone = phone;
    this.bio = bio;
  }

  static _validatePhone(phone) {
    if (!phone || !phone.startsWith("+380")) {
      throw new InvariantError(
        "Business logic violated: phone must be a valid UA format.",
      );
    }
  }

  static _validateInConstructor(id, userId, phone) {
    if (id && id <= 0) throw new InvariantError("ID must be positive");
    if (!userId) throw new InvariantError("User ID is required");
    this._validatePhone(phone);
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
