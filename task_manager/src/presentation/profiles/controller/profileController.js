import ProfileCreateDto from "../dto/profileCreateDto.js";
import ProfileUpdateDto from "../dto/profileUpdateDto.js";
import ProfileFindByIdDto from "../dto/profileFindByIdDto.js";
import handle from "../../../tools/errors/errorHandler.js";

class ProfileController {
  constructor(createCase, updateCase, findByIdCase, deleteByIdCase) {
    this.createCase = createCase;
    this.updateCase = updateCase;
    this.findByIdCase = findByIdCase;
    this.deleteByIdCase = deleteByIdCase;
  }

  create(data) {
    try {
      const dto = new ProfileCreateDto(data);
      const result = this.createCase.execute(dto);

      return {
        status: 201,
        data: result,
      };
    } catch (err) {
      return handle(err);
    }
  }

  update(id, data) {
    try {
      const parsedId = parseInt(id);
      const dto = new ProfileUpdateDto(parsedId, data);
      const result = this.updateCase.execute(dto);

      return {
        status: 200,
        data: result,
      };
    } catch (err) {
      return handle(err);
    }
  }

  findById(id) {
    try {
      const parsedId = parseInt(id);
      const dto = new ProfileFindByIdDto(parsedId);
      const result = this.findByIdCase.execute(dto);

      return {
        status: 200,
        data: result,
      };
    } catch (err) {
      return handle(err);
    }
  }

  deleteById(id) {
    try {
      const parsedId = parseInt(id);
      const dto = new ProfileFindByIdDto(parsedId);
      this.deleteByIdCase.execute(dto);

      return {
        status: 204,
        data: null,
      };
    } catch (err) {
      return handle(err);
    }
  }
}

export default ProfileController;
