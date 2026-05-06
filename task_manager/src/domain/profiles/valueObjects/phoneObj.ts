import { InvariantError } from "../../errors/domainErrors.js";

class Phone {
  readonly value: string;

  constructor(value: string) {
    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(value)) {
      throw new InvariantError(
        "Business logic violated: phone must be a valid UA format (+380...).",
      );
    }
    this.value = value;
  }
}

export default Phone;
