import { NotFoundError } from "../../errors/applicationErrors.js";

class FindProfileById {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(dto) {
    return await this._findProfileOrFail(dto.id);
  }

  async _findProfileOrFail(id) {
    const profile = await this.repository.findById(id);

    if (!profile) {
      throw new NotFoundError("Profile with this id not found");
    }

    return profile;
  }
}

export default FindProfileById;
