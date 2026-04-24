//infrastructure
import InMemoryUsersRepository from "../userRepoMock.js";

//application
import CreateUserCommandHandler from "../../../../dist/application/users/commandHandlers/createUser.js";
import DeleteUserCommandHandler from "../../../../dist/application/users/commandHandlers/deleteUserById.js"
import FindUserQueryHandler from "../../../../dist/application/users/queryHandlers/findUserById.js"
import UpdateUserCommandHandler from "../../../../dist/application/users/commandHandlers/updateUser.js"
import UsersFactory from "../../../../dist/domain/users/factory/usersFactory.js";
import UsersDomainService from "../../../../dist/domain/users/service/usersDomainService.js";

describe("Use cases tests", () => {
    test("Should create user", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const usersDomainService = new UsersDomainService(usersRepository);
        const createUser = new CreateUserCommandHandler(usersRepository, UsersFactory, usersDomainService);
        const findUserById = new FindUserQueryHandler(usersRepository);


        const result = await createUser.handle({
            username: "testuser",
            email: "test@gmail.com",
            password: "123456789"
        });

        const user = await findUserById.handle({id: 1})

        expect(result.id).toBe(1);
        expect(user.username).toBe("testuser");
    });

    test("Should update user", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const usersDomainService = new UsersDomainService(usersRepository);
        const updateUser = new UpdateUserCommandHandler(usersRepository, usersDomainService);
        const createUser = new CreateUserCommandHandler(usersRepository, UsersFactory, usersDomainService);
        const findUserById = new FindUserQueryHandler(usersRepository);


        await createUser.handle({
            username: "testuser",
            email: "test@gmail.com",
            password: "123456789"
        });

        const result = await updateUser.handle({
            id: 1,
            username: "testuser2",
            email: "test22@gmail.com",
            password: "123456789"
        });

        const user = await findUserById.handle({id: 1})


        expect(result.id).toBe(1);
        expect(user.email).toBe("test22@gmail.com");
    });

    test("Should find user", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const usersDomainService = new UsersDomainService(usersRepository);
        const createUser = new CreateUserCommandHandler(usersRepository, UsersFactory, usersDomainService);
        const findUserById = new FindUserQueryHandler(usersRepository);

        await createUser.handle({
            username: "testuser",
            email: "test@gmail.com",
            password: "123456789"
        });

        const result = await findUserById.handle({id: 1})

        expect(result.id).toBe(1);
        expect(result.username).toBe("testuser");
    })

    test("Should not find user", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const usersDomainService = new UsersDomainService(usersRepository);
        const createUser = new CreateUserCommandHandler(usersRepository, UsersFactory, usersDomainService);
        const findUserById = new FindUserQueryHandler(usersRepository);

        await createUser.handle({
            username: "testuser",
            email: "test@gmail.com",
            password: "123456789"
        });

        await expect(findUserById.handle({ id: 4 }))
            .rejects
            .toBeInstanceOf(Error);

    })

    test("Should delete user", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const usersDomainService = new UsersDomainService(usersRepository);
        const createUser = new CreateUserCommandHandler(usersRepository, UsersFactory, usersDomainService);
        const deleteUserById = new DeleteUserCommandHandler(usersRepository);

        await createUser.handle({
            username: "testuser",
            email: "test@gmail.com",
            password: "123456789"
        });

        const isDeleted = await deleteUserById.handle({id: 1})

        await expect(isDeleted).toBe(true);
    })
})