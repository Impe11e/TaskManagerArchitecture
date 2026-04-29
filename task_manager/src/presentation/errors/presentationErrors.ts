class ValidationError extends Error {
  public readonly type = "VALIDATION";

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export { ValidationError };
