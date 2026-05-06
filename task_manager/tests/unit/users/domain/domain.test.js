import UsersFactory from "../../../../dist/domain/users/factory/usersFactory.js";
import UsersDomainService from "../../../../dist/domain/users/service/usersDomainService.js";
import UserRepoMock from "../userRepoMock.js";
import InMemoryUsersRepository from "../userRepoMock.js";
import EmailObj from "../../../../dist/domain/users/valueObjects/emailObj.js";
import IdObj from "../../../../dist/domain/users/valueObjects/idObj.js";
import UsernameObj from "../../../../dist/domain/users/valueObjects/usernameObj.js";
import PasswordObj from "../../../../dist/domain/users/valueObjects/passwordObj.js";

describe("Users Domain Entity test", () => {
    test("should create user entity", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const service = new UsersDomainService(usersRepository);
        const factory = new UsersFactory(service);

        const user = await factory.create(
            "testuser",
            "test@gmail.com",
            "123456789"
        );

        expect(user).toBeDefined();
        expect(user.username.value).toBe("testuser");
        expect(user.email.value).toBe("test@gmail.com");
        expect(user.password.value).toBe("123456789");
    });

    test("should create user with id", () => {

        const user = UsersFactory.reconstitute(
            1,
            "testuser",
            "test@gmail.com",
            "123456789"
        );

        expect(user.id.value).toBe(1);
    });

    test("should update user data", () => {
        const user = UsersFactory.reconstitute(
            1,
            "testuser",
            "test@gmail.com",
            "123456789"
        );

        user.update({
            username: new UsernameObj( "updated"),
            email: new EmailObj("updated@gmail.com"),
            password: new PasswordObj("newpassss")
        });

        expect(user.username.value).toBe("updated");
        expect(user.email.value).toBe("updated@gmail.com");
        expect(user.password.value).toBe("newpassss");
    });

    test("should partially update user", () => {
        const user = UsersFactory.reconstitute(
            1,
            "testuser",
            "test@gmail.com",
            "123456789"
        );

        user.update({
            username: new UsernameObj("newname")
        });

        expect(user.username.value).toBe("newname");
        expect(user.email.value).toBe("test@gmail.com");
        expect(user.password.value).toBe("123456789");
    });
});

describe("Users Domain Service test", () => {
    test("should throw error if email already exists", async () => {
        const mockRepository = new UserRepoMock()
        await mockRepository.create({
            id: new IdObj(1),
            username: new UsernameObj("testuser"),
            email: new EmailObj("test@gmail.com"),
            password: new PasswordObj("123456789")
        })

        const service = new UsersDomainService(mockRepository);

        await expect(service.checkByEmail({value: "test@gmail.com"}))
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
            id: new IdObj(1),
            username: new UsernameObj("testuser"),
            email: new EmailObj("test@gmail.com"),
            password: new PasswordObj("123456789")
        })

        const service = new UsersDomainService(mockRepository);

        await expect(service.checkByUsername({value: "testuser"}))
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