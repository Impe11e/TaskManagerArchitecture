import type { IProfileRepository } from "../../../domain/profiles/domainRequires/repo/IProfileRepo.js";
import type { DeleteProfileCommand } from "../applicationRequires/commands/deleteProfileById.js";
import type { IDeleteHandler } from "../applicationRequires/IHandles/IDeleteHandler.js";
import type { IAuditService } from "../../../modules/audit/IAuditService.js";
import { NotFoundError } from "../../errors/applicationErrors.js";
import Id from "../../../domain/profiles/valueObjects/idObj.js";
import EventProfileDeleted from "../events/deleted.js";

class DeleteProfileCommandHandler implements IDeleteHandler {
  private repository: IProfileRepository;
  private auditService: IAuditService;

  constructor(repository: IProfileRepository, auditService: IAuditService) {
    this.repository = repository;
    this.auditService = auditService;
  }

  public async handle(command: DeleteProfileCommand): Promise<boolean> {
    const id = new Id(command.id);
    const profile = await this._findProfileOrFail(id);

    const isDeleted = await this.repository.deleteById(id);

    if (isDeleted) {
      this.auditService.log(new EventProfileDeleted(profile));
    }

    return isDeleted;
  }

  private async _findProfileOrFail(id: Id) {
    const profile = await this.repository.findById(id);
    if (!profile) {
      throw new NotFoundError("Profile with this id not found");
    }
    return profile;
  }
}

export default DeleteProfileCommandHandler;
