import type { IProfileRepository } from "../../../domain/profiles/domainRequires/repo/IProfileRepo.js";
import type { CreateProfileCommand } from "../applicationRequires/commands/createProfile.js";
import type { ICreateHandler } from "../applicationRequires/ICreateHandler.js";
import type { IFactory } from "../../../domain/profiles/domainRequires/application/IFactory.js";
import type { IService } from "../../../domain/profiles/domainRequires/application/IService.js";

class CreateProfileHandler implements ICreateHandler {
  private repository: IProfileRepository;
  private profileFactory: IFactory;
  private domainService: IService;

  constructor(
    repository: IProfileRepository,
    profileFactory: IFactory,
    domainService: IService,
  ) {
    this.repository = repository;
    this.profileFactory = profileFactory;
    this.domainService = domainService;
  }

  public async handle(command: CreateProfileCommand): Promise<{ id: number }> {
    await this.domainService.checkExistingProfile(command.userId);

    const profileDM = this.profileFactory.create(
      null,
      command.userId,
      command.phone,
      command.bio,
    );
    const createdProfile = await this.repository.create(profileDM);

    return { id: createdProfile.id as number };
  }
}

export default CreateProfileHandler;
