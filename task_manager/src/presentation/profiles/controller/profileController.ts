import type { ICreateHandler } from "../../../application/profiles/applicationRequires/ICreateHandler.js";
import type { IDeleteHandler } from "../../../application/profiles/applicationRequires/IDeleteHandler.js";
import type { IUpdateHandler } from "../../../application/profiles/applicationRequires/IUpdateHandler.js";
import type { IFindHandler } from "../../../application/profiles/applicationRequires/IFindHandler.js";

import type { IProfileController } from "../controllerRequires/IProfileController.js";
import type {
  ResponseType,
  ProfileDataType,
} from "../controllerRequires/controllerTypes.js";

import ResponseMapper from "../responseDto/profileResponseDtoMapper.js";
import handleError from "../../errors/errorHandler.js";
import Validator from "../../validation/validator.js";

class ProfileController implements IProfileController {
  constructor(
    private createHandler: ICreateHandler,
    private updateHandler: IUpdateHandler,
    private findHandler: IFindHandler,
    private deleteHandler: IDeleteHandler,
  ) {}

  async create(data: ProfileDataType): Promise<ResponseType> {
    try {
      Validator.validateProfileData(data, true);
      const command = {
        userId: data.userId!,
        phone: data.phone!,
        bio: data.bio ?? "",
      };
      const res = await this.createHandler.handle(command);
      return { status: 201, data: res };
    } catch (err: any) {
      return handleError(err);
    }
  }

  async update(id: string, data: ProfileDataType): Promise<ResponseType> {
    try {
      Validator.validateProfileData(data, false);
      const pid = Validator.parseId(id);
      const command = {
        id: pid,
        phone: data.phone,
        bio: data.bio,
      };
      const res = await this.updateHandler.handle(command);
      return { status: 200, data: res };
    } catch (err: any) {
      return handleError(err);
    }
  }

  async findById(id: string): Promise<ResponseType> {
    try {
      const pid = Validator.parseId(id);
      const profile = await this.findHandler.handle({ id: pid });
      return {
        status: 200,
        data: ResponseMapper.toResponseDto(profile),
      };
    } catch (err: any) {
      return handleError(err);
    }
  }

  async deleteById(id: string): Promise<ResponseType> {
    try {
      const pid = Validator.parseId(id);
      await this.deleteHandler.handle({ id: pid });
      return { status: 204, data: null };
    } catch (err: any) {
      return handleError(err);
    }
  }
}

export default ProfileController;
