import {InvariantError} from "../../errors/domainErrors.js";

class Password {
    readonly value: string;

    constructor(value: string) {
        if (value.length <= 8) {
            throw new InvariantError('Business logic violated: password is too short.');
        }

        if (value.length >= 30) {
            throw new InvariantError('Business logic violated: password is too long.');
        }

        this.value = value;
    }
}

export default Password;