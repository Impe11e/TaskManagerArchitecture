import { NotFoundError } from "../../errors/applicationErrors.js";

class UpdateProfile {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(dto) {
    const profile = await this._findProfileOrFail(dto.id);

    profile.update({
      phone: dto.phone,
      bio: dto.bio,
    });

    return await this.repository.update(profile);
  }

  async _findProfileOrFail(id) {
    const profile = await this.repository.findById(id);

    if (!profile) {
      throw new NotFoundError("Profile with this id not found");
    }

    return profile;
  }
}

export default UpdateProfile;
