import profileFactory from "../models/profileModel.js";
import ProfileRepository from "../../../domain/profiles/repository/ProfileRepository.js";
import ProfileMapper from "../mapper/profileMapper.js";

class ProfileRepo extends ProfileRepository {
  constructor(factory, mapper) {
    super();
    this.factory = factory;
    this.mapper = mapper;
    this.nextIndex = 1;
    this.profiles = new Map();
  }

  create(entity) {
    const profileObj = this.mapper.toPersistence(entity);
    const { id: _id, ...data } = profileObj;

    const newProfile = this.factory(this.nextIndex, data);
    this.profiles.set(this.nextIndex, newProfile);
    this.nextIndex++;

    return this.mapper.toDomain(newProfile);
  }

  update(entity) {
    const profile = this.profiles.get(entity.id);
    if (!profile) {
      return undefined;
    }

    const profileObj = this.mapper.toPersistence(entity);
    this.profiles.set(profileObj.id, profileObj);

    return this.mapper.toDomain(profileObj);
  }

  findById(id) {
    const profileObj = this.profiles.get(id);
    if (!profileObj) return undefined;
    return this.mapper.toDomain(profileObj);
  }

  findByUserId(userId) {
    for (const profile of this.profiles.values()) {
      if (profile.userId === parseInt(userId)) {
        return this.mapper.toDomain(profile);
      }
    }
    return undefined;
  }

  deleteById(id) {
    return this.profiles.delete(id);
  }
}

export default new ProfileRepo(profileFactory, ProfileMapper);
