import type { IProfileRepository } from "../../../domain/profiles/domainRequires/repo/IProfileRepo.js";
import type { DeleteProfileCommand } from "../applicationRequires/commands/deleteProfileById.js";
import type { IDeleteHandler } from "../applicationRequires/IDeleteHandler.js";
import { NotFoundError } from "../../errors/applicationErrors.js";

class DeleteProfileCommandHandler implements IDeleteHandler {
  private repository: IProfileRepository;

  constructor(repository: IProfileRepository) {
    this.repository = repository;
  }

  public async handle(command: DeleteProfileCommand): Promise<boolean> {
    await this._findProfileOrFail(command.id);
    return await this.repository.deleteById(command.id);
  }

  private async _findProfileOrFail(id: number) {
    const profile = await this.repository.findById(id);
    if (!profile) {
      throw new NotFoundError("Profile with this id not found");
    }
  }
}

export default DeleteProfileCommandHandler;
