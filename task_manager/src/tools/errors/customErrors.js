class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}

class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.status = 409;
    }
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
    }
}

class DomainError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DomainError';
    }
}

export {ValidationError, NotFoundError, ConflictError, ForbiddenError, DomainError};