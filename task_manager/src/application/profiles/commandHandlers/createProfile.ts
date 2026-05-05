import type { IProfileRepository } from "../../../domain/profiles/domainRequires/repo/IProfileRepo.js";
import type { CreateProfileCommand } from "../applicationRequires/commands/createProfile.js";
import type { ICreateHandler } from "../applicationRequires/IHandles/ICreateHandler.js";
import ProfilesFactory from "../../../domain/profiles/factory/profilesFactory.js";
import type { TEventBus } from "../../../modules/eventBus/TEventBus.js";
import EventProfileCreated from "../events/created.js";

class CreateProfileHandler implements ICreateHandler {
  private repository: IProfileRepository;
  private profileFactory: ProfilesFactory;
  private eventBus: TEventBus;

  constructor(
    repository: IProfileRepository,
    profileFactory: ProfilesFactory,
    eventBus: TEventBus,
  ) {
    this.repository = repository;
    this.profileFactory = profileFactory;
    this.eventBus = eventBus;
  }

  public async handle(command: CreateProfileCommand): Promise<{ id: number }> {
    const profileDM = await this.profileFactory.create(
      command.userId,
      command.phone,
      command.bio,
    );
    const createdProfile = await this.repository.create(profileDM);

    this.eventBus.publish(
      "ProfileCreated",
      new EventProfileCreated(createdProfile),
    );

    return { id: createdProfile.id.value };
  }
}

export default CreateProfileHandler;
