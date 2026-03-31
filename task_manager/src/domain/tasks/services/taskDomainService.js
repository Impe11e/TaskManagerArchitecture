import { InvariantError } from "../../errors/domainErrors.js";

export default class TaskDomainService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async validateUserExists(userId) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new InvariantError(`User with ID ${userId} does not exist`);
    }

    return user;
  }
}
