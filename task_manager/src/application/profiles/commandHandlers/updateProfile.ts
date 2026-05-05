import type { IProfileRepository } from "../../../domain/profiles/domainRequires/repo/IProfileRepo.js";
import type { UpdateProfileCommand } from "../applicationRequires/commands/updateProfile.js";
import type { IUpdateHandler } from "../applicationRequires/IHandles/IUpdateHandler.js";
import type { TEventBus } from "../../../modules/eventBus/TEventBus.js";
import { NotFoundError } from "../../errors/applicationErrors.js";
import Id from "../../../domain/profiles/valueObjects/idObj.js";
import Phone from "../../../domain/profiles/valueObjects/phoneObj.js";
import EventProfileUpdated from "../events/updated.js";
import ProfilesFactory from "../../../domain/profiles/factory/profilesFactory.js";
import ProfilesDomainService from "../../../domain/profiles/service/profilesDomainService.js";

class UpdateProfileCommandHandler implements IUpdateHandler {
  private repository: IProfileRepository;
  private domainService: ProfilesDomainService;
  private eventBus: TEventBus;

  constructor(
    repository: IProfileRepository,
    domainService: ProfilesDomainService,
    eventBus: TEventBus,
  ) {
    this.repository = repository;
    this.domainService = domainService;
    this.eventBus = eventBus;
  }

  public async handle(command: UpdateProfileCommand): Promise<{ id: number }> {
    const id = new Id(command.id);

    const profileDM = await this._findProfileOrFail(id);

    const oldProfile = ProfilesFactory.reconstitute(
      profileDM.id.value,
      profileDM.userId.value,
      profileDM.phone.value,
      profileDM.bio,
    );

    const phone = command.phone ? new Phone(command.phone) : undefined;

    profileDM.update({
      phone: phone,
      bio: command.bio,
    });

    const updatedProfile = await this.repository.update(profileDM);

    this.eventBus.publish(
      "ProfileUpdated",
      new EventProfileUpdated(updatedProfile, oldProfile),
    );

    return { id: updatedProfile.id.value };
  }

  private async _findProfileOrFail(id: Id) {
    const profile = await this.repository.findById(id);
    if (!profile) {
      throw new NotFoundError("Profile with this id not found");
    }
    return profile;
  }
}

export default UpdateProfileCommandHandler;
