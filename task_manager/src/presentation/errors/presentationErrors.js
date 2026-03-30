class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.type = 'VALIDATION';
    }
}


export {ValidationError};