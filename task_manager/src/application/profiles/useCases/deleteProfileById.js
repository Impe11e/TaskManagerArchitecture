import { NotFoundError } from "../../errors/applicationErrors.js";

class DeleteProfileById {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(dto) {
    await this._findProfileOrFail(dto.id);
    return await this.repository.deleteById(dto.id);
  }

  async _findProfileOrFail(id) {
    const profile = await this.repository.findById(id);

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }
  }
}

export default DeleteProfileById;
