import { ValidationError } from "../../../tools/errors/customErrors.js";

class ProfileDto {
  constructor() {}

  _validateId(id) {
    if (typeof id !== "number" || isNaN(id)) {
      throw new ValidationError("Validation error: Id must be a valid number");
    }
  }

  _validateData(data) {
    if (!data || typeof data !== "object") {
      throw new ValidationError("Validation error: Data must be an object");
    }
  }
}

export default ProfileDto;
