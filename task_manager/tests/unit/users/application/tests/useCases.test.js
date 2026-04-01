//infrastructure
import InMemoryUsersRepository from "../userRepoMock.js";

//application
import CreateUser from "../../../../../src/application/users/useCases/createUser.js";
import DeleteUserById from "../../../../../src/application/users/useCases/deleteUserById.js"
import FindUserById from "../../../../../src/application/users/useCases/findUserById.js"
import UpdateUser from "../../../../../src/application/users/useCases/updateUser.js"
import UsersFabric from "../../../../../src/domain/users/fabrics/usersFabric.js";
import UsersDomainService from "../../../../../src/domain/users/service/usersDomainService.js";

describe("Use cases tests", () => {
    test("Should create user", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const usersDomainService = new UsersDomainService(usersRepository);
        const createUser = new CreateUser(usersRepository, UsersFabric, usersDomainService);

        const result = await createUser.execute({
            username: "testuser",
            email: "test@gmail.com",
            password: "123456789"
        });

        expect(result.id).toBe(1);
        expect(result.username).toBe("testuser");
    });

    test("Should update user", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const usersDomainService = new UsersDomainService(usersRepository);
        const updateUser = new UpdateUser(usersRepository, usersDomainService);
        const createUser = new CreateUser(usersRepository, UsersFabric, usersDomainService);

        await createUser.execute({
            username: "testuser",
            email: "test@gmail.com",
            password: "123456789"
        });

        const result = await updateUser.execute({
            id: 1,
            username: "testuser2",
            email: "test22@gmail.com",
            password: "123456789"
        });

        expect(result.id).toBe(1);
        expect(result.email).toBe("test22@gmail.com");
    });

    test("Should find user", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const usersDomainService = new UsersDomainService(usersRepository);
        const createUser = new CreateUser(usersRepository, UsersFabric, usersDomainService);
        const findUserById = new FindUserById(usersRepository);

        await createUser.execute({
            username: "testuser",
            email: "test@gmail.com",
            password: "123456789"
        });

        const result = await findUserById.execute({id: 1})

        expect(result.id).toBe(1);
        expect(result.username).toBe("testuser");
    })

    test("Should not find user", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const usersDomainService = new UsersDomainService(usersRepository);
        const createUser = new CreateUser(usersRepository, UsersFabric, usersDomainService);
        const findUserById = new FindUserById(usersRepository);

        await createUser.execute({
            username: "testuser",
            email: "test@gmail.com",
            password: "123456789"
        });

        await expect(findUserById.execute({ id: 4 }))
            .rejects
            .toBeInstanceOf(Error);

    })

    test("Should delete user", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const usersDomainService = new UsersDomainService(usersRepository);
        const createUser = new CreateUser(usersRepository, UsersFabric, usersDomainService);
        const deleteUserById = new DeleteUserById(usersRepository);

        await createUser.execute({
            username: "testuser",
            email: "test@gmail.com",
            password: "123456789"
        });

        const isDeleted = await deleteUserById.execute({id: 1})

        await expect(isDeleted).toBe(true);
    })
})