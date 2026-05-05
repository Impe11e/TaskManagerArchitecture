import type { ICreateHandler } from "../../../application/profiles/applicationRequires/IHandles/ICreateHandler.js";
import type { IDeleteHandler } from "../../../application/profiles/applicationRequires/IHandles/IDeleteHandler.js";
import type { IUpdateHandler } from "../../../application/profiles/applicationRequires/IHandles/IUpdateHandler.js";
import type { IFindHandler } from "../../../application/profiles/applicationRequires/IHandles/IFindHandler.js";

import type { IProfileController } from "../controllerRequires/IProfileController.js";
import type {
  ResponseType,
  DataType,
} from "../controllerRequires/controllerTypes.js";

import ResponseMapper from "../responseDto/profilesResponseDtoMapper.js";
import handleError from "../../errors/errorHandler.js";
import Validator from "../../errors/validator.js";

class ProfilesController implements IProfileController {
  private createHandler: ICreateHandler;
  private updateHandler: IUpdateHandler;
  private findHandler: IFindHandler;
  private deleteHandler: IDeleteHandler;

  constructor(
    createHandler: ICreateHandler,
    updateHandler: IUpdateHandler,
    findHandler: IFindHandler,
    deleteHandler: IDeleteHandler,
  ) {
    this.createHandler = createHandler;
    this.updateHandler = updateHandler;
    this.findHandler = findHandler;
    this.deleteHandler = deleteHandler;
  }

  async create(data: unknown): Promise<ResponseType> {
    try {
      const validData: DataType = Validator.validateData(data, true);

      const command = {
        userId: validData.userId,
        phone: validData.phone,
        bio: validData.bio,
      };

      const res = await this.createHandler.handle(command);

      return {
        status: 201,
        data: res,
      };
    } catch (err) {
      return handleError(err);
    }
  }

  async update(id: unknown, data: unknown): Promise<ResponseType> {
    try {
      const validData: Partial<DataType> = Validator.validateData(data, false);
      const pid: number = Validator.parseId(id);

      const command = {
        id: pid,
        phone: validData.phone,
        bio: validData.bio,
      };

      const res = await this.updateHandler.handle(command);

      return {
        status: 200,
        data: res,
      };
    } catch (err) {
      return handleError(err);
    }
  }

  async findById(id: unknown): Promise<ResponseType> {
    try {
      const pid: number = Validator.parseId(id);
      const query = { id: pid };

      const profile = await this.findHandler.handle(query);

      return {
        status: 200,
        data: ResponseMapper.toResponseDto(profile),
      };
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteById(id: unknown): Promise<ResponseType> {
    try {
      const pid: number = Validator.parseId(id);
      const command = { id: pid };

      await this.deleteHandler.handle(command);

      return {
        status: 204,
        data: null,
      };
    } catch (err) {
      return handleError(err);
    }
  }
}

export default ProfilesController;
