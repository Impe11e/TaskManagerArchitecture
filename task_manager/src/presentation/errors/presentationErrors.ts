export class ValidationError extends Error {
  type: string = 'VALIDATION';
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
