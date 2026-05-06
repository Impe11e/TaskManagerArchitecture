import type { IProfileRepository } from "../../../domain/profiles/domainRequires/repo/IProfileRepo.js";
import type { UpdateProfileCommand } from "../applicationRequires/commands/updateProfile.js";
import type { IUpdateHandler } from "../applicationRequires/IUpdateHandler.ts";
import type { TProfileEntity } from "../../../domain/profiles/domainRequires/application/TProfileEntity.js";
import { NotFoundError } from "../../errors/applicationErrors.js";

class UpdateProfileCommandHandler implements IUpdateHandler {
  private repository: IProfileRepository;

  constructor(repository: IProfileRepository) {
    this.repository = repository;
  }

  public async handle(command: UpdateProfileCommand): Promise<{ id: number }> {
    const profileDM = await this._findProfileOrFail(command.id);

    profileDM.update({
      phone: command.phone as string,
      bio: command.bio as string,
    });

    const updatedProfile = await this.repository.update(profileDM);
    return { id: updatedProfile.id as number };
  }

  private async _findProfileOrFail(id: number): Promise<TProfileEntity> {
    const profile = await this.repository.findById(id);
    if (!profile) {
      throw new NotFoundError("Profile with this id not found");
    }
    return profile;
  }
}

export default UpdateProfileCommandHandler;
