class NotFoundError extends Error {
  public readonly type = "NOT_FOUND";

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, Error.prototype);
  }
}

export { NotFoundError };
