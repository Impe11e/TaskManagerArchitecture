import { InvariantError } from "../../errors/domainErrors.js";

type UpdateObjType = {
  phone: string;
  bio: string;
};

class ProfileEntity {
  public id: number | null;
  public userId: number;
  public phone: string;
  public bio: string;

  constructor(id: number | null, userId: number, phone: string, bio: string) {
    ProfileEntity._validateInConstructor(id, userId, phone);

    this.id = id;
    this.userId = userId;
    this.phone = phone;
    this.bio = bio;
  }

  static _validatePhone(phone: string): void {
    if (!phone || !phone.startsWith("+380")) {
      throw new InvariantError(
        "Business logic violated: phone must be a valid UA format.",
      );
    }
  }

  static _validateInConstructor(
    id: number | null,
    userId: number,
    phone: string,
  ): void {
    if (id !== null && id <= 0) {
      throw new InvariantError("Business logic violated: ID must be positive.");
    }
    if (!userId) {
      throw new InvariantError("Business logic violated: User ID is required.");
    }
    this._validatePhone(phone);
  }

  public update({ phone, bio }: UpdateObjType): void {
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
