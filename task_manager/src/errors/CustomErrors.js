class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
        this.type = 'ValidationError';
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
        this.type = 'NotFoundError';
    }
}

class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.status = 409;
        this.type = 'ConflictError';
    }
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
        this.type = 'ForbiddenError';
    }
}