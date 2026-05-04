import { ConflictError } from "../../errors/domainErrors.js";
import type { IProfileRepository } from "../domainRequires/repo/IProfileRepo.js";

class ProfilesDomainService {
  private repository: IProfileRepository;

  constructor(repository: IProfileRepository) {
    this.repository = repository;
  }

  async checkExistingProfile(userId: number): Promise<void> {
    const profile = await this.repository.findByUserId(userId);
    if (profile) {
      throw new ConflictError(`Profile for user ${userId} already exists`);
    }
  }
}

export default ProfilesDomainService;
