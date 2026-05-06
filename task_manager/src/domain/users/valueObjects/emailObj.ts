import {InvariantError} from "../../errors/domainErrors.js";

class Email {
    readonly value: string;

    constructor(value: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
            throw new InvariantError('Business logic violated: email has invalid format.');
        }

        this.value = value;
    }
}

export default Email;