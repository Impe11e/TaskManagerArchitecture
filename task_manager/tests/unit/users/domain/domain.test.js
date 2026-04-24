import UsersFactory from "../../../../dist/domain/users/factory/usersFactory.js";
import UsersDomainService from "../../../../dist/domain/users/service/usersDomainService.js";
import UserRepoMock from "../userRepoMock.js";

describe("Users Domain Entity test", () => {
    test("should create user entity", () => {
        const user = UsersFactory.create(
            null,
            "testuser",
            "test@gmail.com",
            "123456789"
        );

        expect(user).toBeDefined();
        expect(user.username).toBe("testuser");
        expect(user.email).toBe("test@gmail.com");
        expect(user.password).toBe("123456789");
    });

    test("should create user with id", () => {
        const user = UsersFactory.create(
            1,
            "testuser",
            "test@gmail.com",
            "123456789"
        );

        expect(user.id).toBe(1);
    });

    test("should update user data", () => {
        const user = UsersFactory.create(
            1,
            "testuser",
            "test@gmail.com",
            "123456789"
        );

        user.update({
            username: "updated",
            email: "updated@gmail.com",
            password: "newpassss"
        });

        expect(user.username).toBe("updated");
        expect(user.email).toBe("updated@gmail.com");
        expect(user.password).toBe("newpassss");
    });

    test("should partially update user", () => {
        const user = UsersFactory.create(
            1,
            "testuser",
            "test@gmail.com",
            "123456789"
        );

        user.update({
            username: "newname"
        });

        expect(user.username).toBe("newname");
        expect(user.email).toBe("test@gmail.com");
        expect(user.password).toBe("123456789");
    });
});

describe("Users Domain Service test", () => {
    test("should throw error if email already exists", async () => {
        const mockRepository = new UserRepoMock()
        await mockRepository.create({
            id: 1,
            username: "testuser",
            email: "test@gmail.com",
            password: "123456789"
        })

        const service = new UsersDomainService(mockRepository);

        await expect(service.checkByEmail("test@gmail.com"))
            .rejects
            .toBeInstanceOf(Error);
    });

    test("should pass if email does not exist", async () => {
        const mockRepository = new UserRepoMock()

        const service = new UsersDomainService(mockRepository);

        await expect(service.checkByEmail("test@gmail.com"))
            .resolves
            .toBeUndefined();
    });

    test("should throw error if username already exists", async () => {
        const mockRepository = new UserRepoMock()
        await mockRepository.create({
            id: 1,
            username: "testuser",
            email: "test@gmail.com",
            password: "123456789"
        })

        const service = new UsersDomainService(mockRepository);

        await expect(service.checkByUsername("testuser"))
            .rejects
            .toBeInstanceOf(Error);
    });

    test("should pass if username does not exist", async () => {
        const mockRepository = new UserRepoMock()

        const service = new UsersDomainService(mockRepository);

        await expect(service.checkByUsername("testuser"))
            .resolves
            .toBeUndefined();
    });
});