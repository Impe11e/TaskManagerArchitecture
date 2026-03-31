class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.type = 'NOT_FOUND';
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.type = 'VALIDATION';
    }
}   
    
export {NotFoundError, ValidationError}
