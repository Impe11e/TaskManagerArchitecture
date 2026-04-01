class CreateProfile {
  constructor(repository, profilesFabric, domainService) {
    this.repository = repository;
    this.profilesFabric = profilesFabric;
    this.domainService = domainService;
  }

  async execute(dto) {
    await this.domainService.checkExistingProfile(dto.userId);

    const profile = this.profilesFabric.create(
      null,
      dto.userId,
      dto.phone,
      dto.bio,
    );

    return await this.repository.create(profile);
  }
}

export default CreateProfile;
