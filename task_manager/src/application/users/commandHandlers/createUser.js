class CreateUserHandler {
    constructor(repository, userFactory, domainService) {
        this.repository = repository;
        this.userFactory = userFactory;
        this.domainService = domainService;
    }

    async handle(command) {
        await this.domainService.checkByEmail(command.email);
        await this.domainService.checkByUsername(command.username);

        const userDM = this.userFactory.create(null, command.username, command.email, command.password);
        const createdUser = await this.repository.create(userDM);

        return createdUser.id
    }
}

export default CreateUserHandler