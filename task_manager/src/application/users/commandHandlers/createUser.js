class CreateUserHandler {
    constructor(repository, userFabric, domainService) {
        this.repository = repository;
        this.userFabric = userFabric;
        this.domainService = domainService;
    }

    async handle(command) {
        await this.domainService.checkByEmail(command.email);
        await this.domainService.checkByUsername(command.username);

        const userDM = this.userFabric.create(null, command.username, command.email, command.password);
        const createdUser = await this.repository.create(userDM);

        return createdUser.id
    }
}

export default CreateUserHandler