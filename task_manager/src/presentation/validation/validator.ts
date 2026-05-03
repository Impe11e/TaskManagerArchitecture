import { ProfileDataType } from "../profiles/controllerRequires/controllerTypes.js";
import { ValidationError } from "../errors/presentationErrors.js";

class Validator {
  static validateProfileData(data: ProfileDataType, strict = false) {
    if (!data || typeof data !== "object") {
      throw new ValidationError("Validation error: Invalid data (not object)");
    }

    if (strict && !data.userId) {
      throw new ValidationError(
        "Validation error: Profile's attribute missing: userId",
      );
    }

    if (data.phone && typeof data.phone !== "string") {
      throw new ValidationError("Validation error: phone must be a string");
    }
  }

  static parseId(rawId: string): number {
    const id = parseInt(rawId);
    if (isNaN(id) || !Number.isInteger(id)) {
      throw new ValidationError("Validation error: Id must be a valid integer");
    }
    return id;
  }
}

export default Validator;
