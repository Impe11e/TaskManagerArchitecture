class InvariantError extends Error {
  public readonly type = "INVARIANT";

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, Error.prototype);
  }
}

class ConflictError extends Error {
  public readonly type = "CONFLICT";

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, Error.prototype);
  }
}

export { InvariantError, ConflictError };
