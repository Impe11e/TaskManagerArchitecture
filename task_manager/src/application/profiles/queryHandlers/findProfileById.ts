import { NotFoundError } from "../../errors/applicationErrors.js";
import type { IProfileRepository } from "../../../domain/profiles/domainRequires/repo/IProfileRepo.js";
import type { FindProfileQuery } from "../applicationRequires/queries/findProfileById.js";
import type { IFindHandler } from "../applicationRequires/IHandles/IFindHandler.js";
import ProfileEntity from "../../../domain/profiles/entity/profileEntity.js";
import Id from "../../../domain/profiles/valueObjects/idObj.js";

class FindProfileQueryHandler implements IFindHandler {
  private repository: IProfileRepository;

  constructor(repository: IProfileRepository) {
    this.repository = repository;
  }

  public async handle(query: FindProfileQuery): Promise<ProfileEntity> {
    const id = new Id(query.id);
    const profile = await this.repository.findById(id);

    if (!profile) {
      throw new NotFoundError("Profile with this id not found");
    }

    return profile;
  }
}

export default FindProfileQueryHandler;
