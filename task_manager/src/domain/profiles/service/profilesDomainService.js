import { ConflictError } from "../../errors/domainErrors.js";

class ProfilesDomainService {
  constructor(repository) {
    this.repository = repository;
  }

  async checkExistingProfile(userId) {
    const profile = await this.repository.findByUserId(userId);
    if (profile) {
      throw new ConflictError(`Profile for user ${userId} already exists`);
    }
  }
}

export default ProfilesDomainService;
