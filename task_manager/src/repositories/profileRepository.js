import profileFactory from "../models/profileModel";

class ProfileRepo {
  constructor(factory) {
    this.factory = factory;
    this.nextIndex = 0;
    this.profiles = new Map();
  }

  create(data) {
    const newProfile = this.factory(this.nextIndex, data);
    this.profiles.set(this.nextIndex, newProfile);
    this.nextIndex++;
    return newProfile;
  }

  update(id, data) {
    const profile = this.profiles.get(id);
    if (!profile) return undefined;

    const updatedProfile = { ...profile, ...data };
    this.profiles.set(id, updatedProfile);
    return updatedProfile;
  }

  findById(id) {
    return this.profiles.get(id);
  }

  findByUserId(userId) {
    for (const profile of this.profiles.values()) {
      if (profile.userId === parseInt(userId)) {
        return profile;
      }
    }
    return undefined;
  }

  deleteById(id) {
    return this.profiles.delete(id);
  }
}

export default new ProfileRepo(profileFactory);
