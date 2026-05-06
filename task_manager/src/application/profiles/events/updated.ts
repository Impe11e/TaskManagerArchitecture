import ProfileEntity from "../../../domain/profiles/entity/profileEntity.js";

class EventProfileUpdated {
  public readonly operation: string = "Profile Updated";
  public readonly entityId: number;
  public readonly payload: any;
  public readonly occurredAt: Date;

  constructor(newProfile: ProfileEntity, oldProfile: ProfileEntity) {
    this.entityId = newProfile.id.value;
    this.payload = {
      currentData: {
        profileId: newProfile.id.value,
        userId: newProfile.userId.value,
        phone: newProfile.phone.value,
        bio: newProfile.bio,
      },
      oldData: {
        profileId: oldProfile.id.value,
        userId: oldProfile.userId.value,
        phone: oldProfile.phone.value,
        bio: oldProfile.bio,
      },
    };
    this.occurredAt = new Date();
  }
}

export default EventProfileUpdated;
