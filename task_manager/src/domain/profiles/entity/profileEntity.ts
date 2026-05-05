import Phone from "../valueObjects/phoneObj.js";
import Id from "../valueObjects/idObj.js";

type UpdateObjType = {
  phone: Phone | undefined;
  bio: string | undefined;
};

class ProfileEntity {
  constructor(
    public readonly id: Id,
    public readonly userId: Id,
    public phone: Phone,
    public bio: string,
  ) {}

  public update({ phone, bio }: UpdateObjType): void {
    if (phone !== undefined) this.phone = phone;
    if (bio !== undefined) this.bio = bio;
  }
}

export default ProfileEntity;
