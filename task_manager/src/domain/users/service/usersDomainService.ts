import {ConflictError} from "../../errors/domainErrors.js";
import type {IUserRepository} from '../domainRequires/repo/IUserRepo.js'

class UsersDomainService {
    private repository: IUserRepository;

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    async checkByEmail(email: string): Promise<void> {
        const user = await this.repository.checkByEmail(email);
        if (user) {
            throw new ConflictError(`User with ${email} email already exists`);
        }
    }

    async checkByUsername(username:string): Promise<void> {
        const user = await this.repository.checkByUsername(username);
        if (user) {
            throw new ConflictError(`User ${username} already exists`);
        }
    }
}

export default UsersDomainService;