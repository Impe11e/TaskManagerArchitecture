import TaskEntity from "../../../../src/domain/tasks/entities/taskEntity.js";
import TaskFactory from "../../../../src/domain/tasks/factories/taskFactory.js";
import TaskDomainService from "../../../../src/domain/tasks/services/taskDomainService.js";

describe("Task Domain Entity test", () => {
    test("should create task entity", () => {
        const task = new TaskEntity({
            title: "Test Task",
            description: "Test Description",
            userId: 1
        });

        expect(task).toBeDefined();
        expect(task.title).toBe("Test Task");
    });

    test("should throw error if title is too short", () => {
        expect(() => {
            new TaskEntity({
                title: "Ab",
                description: "Test Description",
                userId: 1
            });
        }).toThrow();
    });

    test("should throw error if userId is invalid", () => {
        expect(() => {
            new TaskEntity({
                title: "Valid Title",
                description: "Valid Description",
                userId: 0
            });
        }).toThrow();
    });
});

describe("Task Domain Service test", () => {
    test("should throw error if user does not exist", async () => {
        const mockRepository = {
            findById: async () => null
        };

        const service = new TaskDomainService(mockRepository);

        await expect(service.validateUserExists(999))
            .rejects
            .toBeInstanceOf(Error);
    });

    test("should return user if exists", async () => {
        const mockUser = { id: 1, username: "testuser", email: "test@gmail.com" };
        const mockRepository = {
            findById: async () => mockUser
        };

        const service = new TaskDomainService(mockRepository);

        const result = await service.validateUserExists(1);
        expect(result).toEqual(mockUser);
    });
});

describe("Task Factory test", () => {
    let mockTaskRepository;
    let mockUsersRepository;
    let taskDomainService;
    let taskFactory;

    beforeEach(() => {
        mockTaskRepository = {
            findByTitle: async () => null,
            countByStatus: async () => 0
        };

        mockUsersRepository = {
            findById: async (id) => {
                if (id === 1) {
                    return { id: 1, username: "testuser" };
                }
                return null;
            }
        };

        taskDomainService = new TaskDomainService(mockUsersRepository);
        taskFactory = new TaskFactory(mockTaskRepository, taskDomainService);
    });

    test("should create task entity", async () => {
        const result = await taskFactory.create({
            title: "Test Task",
            description: "Test Description",
            userId: 1
        });

        expect(result).toBeDefined();
        expect(result.title).toBe("Test Task");
    });

    test("should throw error if user does not exist", async () => {
        await expect(
            taskFactory.create({
                title: "Test Task",
                description: "Test Description",
                userId: 999
            })
        ).rejects.toThrow();
    });

    test("should throw error if title already exists", async () => {
        mockTaskRepository.findByTitle = async () => ({
            id: 1,
            title: "Existing Task"
        });

        await expect(
            taskFactory.create({
                title: "Existing Task",
                description: "Test Description",
                userId: 1
            })
        ).rejects.toThrow();
    });
});
