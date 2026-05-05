import type { DataType } from "../profiles/controllerRequires/controllerTypes.js";
import { ValidationError } from "./presentationErrors.js";

class Validator {
  static validateData(data: unknown, strict = false): DataType {
    if (!data || typeof data !== "object") {
      throw new ValidationError("Validation error: Invalid data (not object)");
    }

    const REQUIRED = ["userId", "phone", "bio"];
    const ALLOWED = ["id", ...REQUIRED];
    const attributes = Object.keys(data);

    for (const attribute of attributes) {
      if (!ALLOWED.includes(attribute)) {
        throw new ValidationError(
          `Validation error: Profile doesn't have ${attribute} as an attribute`,
        );
      }
    }

    if (strict) {
      for (const required of REQUIRED) {
        if (!attributes.includes(required)) {
          throw new ValidationError(
            `Validation error: Profile's attribute missing: ${required}`,
          );
        }
      }
    }

    const obj = data as Record<string, unknown>;

    Validator.validateUserId(obj.userId);
    Validator.validatePhone(obj.phone);
    Validator.validateBio(obj.bio);

    return data as DataType;
  }

  static parseId(rawId: unknown): number {
    if (typeof rawId == "string") {
      const id = parseInt(rawId);
      if (!Number.isInteger(id)) {
        throw new ValidationError(
          "Validation error: Id seems not to be an integer",
        );
      }
      return id;
    }
    throw new ValidationError(
      "Validation error: controller should receive id as string",
    );
  }

  private static validateUserId(userId: unknown) {
    if (userId !== undefined && typeof userId !== "number") {
      throw new ValidationError(`Validation error: userId must be a number`);
    }
  }

  private static validatePhone(phone: unknown) {
    if (phone !== undefined && typeof phone !== "string") {
      throw new ValidationError(`Validation error: phone must be a string`);
    }
  }

  private static validateBio(bio: unknown) {
    if (bio !== undefined && typeof bio !== "string") {
      throw new ValidationError(`Validation error: bio must be a string`);
    }
  }
}

export default Validator;
