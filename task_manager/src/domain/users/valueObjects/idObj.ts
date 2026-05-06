import {InvariantError} from "../../errors/domainErrors.js";

class Id {
    readonly value: number;

    constructor(value: number) {
        if (value <= 0) {
            throw new InvariantError('Business logic violated: id should be greater than 0.');
        }

        this.value = value;
    }
}

export default Id;