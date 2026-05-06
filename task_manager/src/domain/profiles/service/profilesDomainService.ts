import { ConflictError } from "../../errors/domainErrors.js";
import type { IProfileRepository } from "../domainRequires/repo/IProfileRepo.js";

class ProfilesDomainService {
  private repository: IProfileRepository;

  constructor(repository: IProfileRepository) {
    this.repository = repository;
  }

  async checkByUserId(userId: number): Promise<void> {
    const exists = await this.repository.checkByUserId(userId);
    if (exists) {
      throw new ConflictError(
        `Profile for user with ID ${userId} already exists`,
      );
    }
  }
}

export default ProfilesDomainService;
