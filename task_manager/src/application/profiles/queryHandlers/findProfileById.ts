import { NotFoundError } from "../../errors/applicationErrors.js";
import type { IProfileRepository } from "../../../domain/profiles/domainRequires/repo/IProfileRepo.js";
import type { IFindHandler } from "../applicationRequires/IFindHandler.js";
import type { TProfileEntity } from "../../../domain/profiles/domainRequires/application/TProfileEntity.js";
import type { FindProfileQuery } from "../applicationRequires/queries/findProfileById.js";

class FindProfileQueryHandler implements IFindHandler {
  private repository: IProfileRepository;

  constructor(repository: IProfileRepository) {
    this.repository = repository;
  }

  public async handle(query: FindProfileQuery): Promise<TProfileEntity> {
    return await this._findProfileOrFail(query.id);
  }

  private async _findProfileOrFail(id: number): Promise<TProfileEntity> {
    const profile = await this.repository.findById(id);
    if (!profile) {
      throw new NotFoundError("Profile with this id not found");
    }
    return profile;
  }
}

export default FindProfileQueryHandler;
