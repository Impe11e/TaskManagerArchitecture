import ProfileEntity from "../../../domain/profiles/entity/profileEntity.js";

class EventProfileCreated {
  public readonly operation: string = "Profile Created";
  public readonly entityId: number;
  public readonly payload: any;
  public readonly occurredAt: Date;

  constructor(profile: ProfileEntity) {
    this.entityId = profile.id.value;
    this.payload = {
      userId: profile.userId.value,
      phone: profile.phone.value,
      bio: profile.bio,
    };
    this.occurredAt = new Date();
  }
}

export default EventProfileCreated;
