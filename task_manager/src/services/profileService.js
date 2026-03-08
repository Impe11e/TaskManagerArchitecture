import profileRepo from "../repositories/profileRepository";

class ProfileService {
  constructor(repository) {
    this.repository = repository;
  }

  #checkUnique(userId, currentProfileId = null) {
    const existingProfile = this.repository.findByUserId(userId);
    if (existingProfile && existingProfile.id !== currentProfileId) {
      throw new Error("Profile for this user already exists");
    }
  }

  #checkExists(id) {
    const profile = this.repository.findById(id);
    if (!profile) throw new Error("Profile with this ID doesnt exist");
  }

  create(data) {
    this.#checkUnique(data.userId);
    return this.repository.create(data);
  }

  update(id, data) {
    this.#checkExists(id);
    return this.repository.update(id, data);
  }

  findById(id) {
    const profile = this.repository.findById(id);
    if (!profile) throw new Error("Profile with this ID doesnt exist");
    return profile;
  }

  deleteById(id) {
    this.#checkExists(id);
    return this.repository.deleteById(id);
  }
}

export default new ProfileService(profileRepo);
