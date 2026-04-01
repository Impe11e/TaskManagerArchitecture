import ProfileCreateDto from "../requestDto/profileCreateDto.js";
import ProfileUpdateDto from "../requestDto/profileUpdateDto.js";
import ProfileFindByIdDto from "../requestDto/profileFindByIdDto.js";
import responseMapper from "../responseDto/profileResponseDtoMapper.js";
import handle from "../../errors/errorHandler.js";
import { ValidationError } from "../../errors/presentationErrors.js";

class ProfileController {
  constructor(createCase, updateCase, findByIdCase, deleteByIdCase) {
    this.createCase = createCase;
    this.updateCase = updateCase;
    this.findByIdCase = findByIdCase;
    this.deleteByIdCase = deleteByIdCase;
  }

  async create(data) {
    try {
      this._validateData(data, true);
      const dto = new ProfileCreateDto(data);
      const profile = await this.createCase.execute(dto);
      return {
        status: 201,
        data: responseMapper.toResponseDto(profile),
      };
    } catch (err) {
      return handle(err);
    }
  }

  async update(id, data) {
    try {
      this._validateData(data, false);
      const parsedId = this._parseId(id);
      const dto = new ProfileUpdateDto(parsedId, data);
      const profile = await this.updateCase.execute(dto);
      return {
        status: 200,
        data: responseMapper.toResponseDto(profile),
      };
    } catch (err) {
      return handle(err);
    }
  }

  async findById(id) {
    try {
      const parsedId = this._parseId(id);
      const dto = new ProfileFindByIdDto(parsedId);
      const profile = await this.findByIdCase.execute(dto);
      return {
        status: 200,
        data: responseMapper.toResponseDto(profile),
      };
    } catch (err) {
      return handle(err);
    }
  }

  async deleteById(id) {
    try {
      const parsedId = this._parseId(id);
      const dto = new ProfileFindByIdDto(parsedId);
      await this.deleteByIdCase.execute(dto);
      return {
        status: 204,
        data: null,
      };
    } catch (err) {
      return handle(err);
    }
  }

  _validateData(data, strict = false) {
    if (!data || typeof data !== "object") {
      throw new ValidationError("Validation error: Invalid data (not object)");
    }
    if (strict && !data.userId) {
      throw new ValidationError("Validation error: userId is required");
    }
  }

  _parseId(rawId) {
    const id = parseInt(rawId);
    if (isNaN(id)) {
      throw new ValidationError("Validation error: Id must be a number");
    }
    return id;
  }
}
export default ProfileController;
