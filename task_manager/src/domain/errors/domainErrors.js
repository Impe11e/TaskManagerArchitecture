class InvariantError extends Error {
    constructor(message) {
        super(message);
        this.type = 'INVARIANT';
    }
}

class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.type = 'CONFLICT';
    }
}

export {InvariantError, ConflictError};