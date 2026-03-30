import DomainError from "../../errors/domainErrors.js";

class UsersDomainService {
    constructor(repository) {
        this.repository = repository;
    }

    async checkByEmail(email) {
        const user = await this.repository.checkByEmail(email);
        if (user) {
            throw new DomainError(`User ${email} already exists`);
        }
    }

    async checkByUsername(username) {
        const user = await this.repository.checkByUsername(username);
        if (user) {
            throw new DomainError(`User ${username} already exists`);
        }
    }
}

export default UsersDomainService;