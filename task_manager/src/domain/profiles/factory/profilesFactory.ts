import NewProfileEntity from "../entity/newProfileEntity.js";
import Id from "../valueObjects/idObj.js";
import Phone from "../valueObjects/phoneObj.js";
import ProfileEntity from "../entity/profileEntity.js";
import ProfilesDomainService from "../service/profilesDomainService.js";

class ProfilesFactory {
  private domainService: ProfilesDomainService;

  constructor(domainService: ProfilesDomainService) {
    this.domainService = domainService;
  }

  async create(
    userId: number,
    rawPhone: string,
    bio: string,
  ): Promise<NewProfileEntity> {
    const phone = new Phone(rawPhone);
    const user_id = new Id(userId);

    await this.domainService.checkByUserId(userId);

    return new NewProfileEntity(user_id, phone, bio);
  }

  static reconstitute(
    rawId: number,
    rawUserId: number,
    rawPhone: string,
    rawBio: string,
  ): ProfileEntity {
    return new ProfileEntity(
      new Id(rawId),
      new Id(rawUserId),
      new Phone(rawPhone),
      rawBio,
    );
  }
}

export default ProfilesFactory;
