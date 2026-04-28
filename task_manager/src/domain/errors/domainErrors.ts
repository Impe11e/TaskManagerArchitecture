export class InvariantError extends Error {
  type: string = 'INVARIANT';
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvariantError.prototype);
  }
}

export class ConflictError extends Error {
  type: string = 'CONFLICT';
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
