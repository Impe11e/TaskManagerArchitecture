import NewUserEntity from "../entity/newUserEntity.js";
import Id from "../valueObjects/idObj.js";
import type {IService} from "../domainRequires/application/IService.js";
import Email from "../valueObjects/emailObj.js";
import Username from "../valueObjects/usernameObj.js";
import Password from "../valueObjects/passwordObj.js";
import UserEntity from "../entity/userEntity.js";

class UsersFactory {
    private domainService: IService;

    constructor(domainService: IService) {
        this.domainService = domainService;
    }

    async create(rawUsername: string, rawEmail: string, rawPassword: string): Promise<NewUserEntity> {

        const email = new Email(rawEmail)
        const username = new Username(rawUsername)
        const password = new Password(rawPassword)

        await this.domainService.checkByEmail(email);
        await this.domainService.checkByUsername(username);

        return new NewUserEntity(username, email, password)
    }

    static reconstitute(rawId: number, rawUsername: string, rawEmail: string, rawPassword: string): UserEntity {
        const id = new Id(rawId);
        const email = new Email(rawEmail)
        const username = new Username(rawUsername)
        const password = new Password(rawPassword)

        return new UserEntity(id, username, email, password)
    }
}

export default UsersFactory;