import {InvariantError} from "../../errors/domainErrors.js";

class Username {
    readonly value: string;

    constructor(value: string) {
        if (value.length <= 5) {
            throw new InvariantError('Business logic violated: username is too short.');
        }

        if (value.length >= 20) {
            throw new InvariantError('Business logic violated: username is too long.');
        }

        this.value = value;
    }
}

export default Username