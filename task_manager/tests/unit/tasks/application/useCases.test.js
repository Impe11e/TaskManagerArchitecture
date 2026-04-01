// infrastructure
import InMemoryTaskRepository from "../taskRepoMock.js";
import InMemoryUsersRepository from "../../users/userRepoMock.js";

// application
import CreateTaskUseCase from "../../../../src/application/tasks/useCases/createTask.js";
import UpdateTaskUseCase from "../../../../src/application/tasks/useCases/updateTask.js";
import GetTaskByIdUseCase from "../../../../src/application/tasks/useCases/getTaskById.js";
import DeleteTaskUseCase from "../../../../src/application/tasks/useCases/deleteTask.js";
import GetAllTasksUseCase from "../../../../src/application/tasks/useCases/getAllTasks.js";

// domain
import TaskFactory from "../../../../src/domain/tasks/factories/taskFactory.js";
import TaskDomainService from "../../../../src/domain/tasks/services/taskDomainService.js";

describe("Task Use cases tests", () => {
    let taskRepository;
    let usersRepository;
    let taskDomainService;
    let taskFactory;
    const testUserId = 1;

    beforeEach(() => {
        taskRepository = new InMemoryTaskRepository();
        usersRepository = new InMemoryUsersRepository();
        taskDomainService = new TaskDomainService(usersRepository);
        taskFactory = new TaskFactory(taskRepository, taskDomainService);

        // Create one test user for all tests
        usersRepository.users.push({
            id: testUserId,
            username: "testuser",
            email: "test@gmail.com",
            password: "hashedpass"
        });
    });

    test("Should create task", async () => {
        const createTaskUseCase = new CreateTaskUseCase(taskRepository, taskFactory);

        const result = await createTaskUseCase.execute({
            title: "Test Task",
            description: "Test Description",
            userId: testUserId
        });

        expect(result.id).toBe(1);
        expect(result.title).toBe("Test Task");
    });

    test("Should update task", async () => {
        const createTaskUseCase = new CreateTaskUseCase(taskRepository, taskFactory);
        const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);

        await createTaskUseCase.execute({
            title: "Original Title",
            description: "Original Description",
            userId: testUserId
        });

        const result = await updateTaskUseCase.execute(1, {
            title: "Updated Title",
            description: "Updated Description"
        });

        expect(result.id).toBe(1);
        expect(result.title).toBe("Updated Title");
    });

    test("Should not update non-existent task", async () => {
        const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);

        await expect(
            updateTaskUseCase.execute(999, {
                title: "Updated Title"
            })
        ).rejects.toThrow();
    });

    test("Should get task by id", async () => {
        const createTaskUseCase = new CreateTaskUseCase(taskRepository, taskFactory);
        const getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository);

        await createTaskUseCase.execute({
            title: "Test Task",
            description: "Description",
            userId: testUserId
        });

        const result = await getTaskByIdUseCase.execute(1);

        expect(result.id).toBe(1);
        expect(result.title).toBe("Test Task");
    })

    test("Should not get non-existent task by id", async () => {
        const getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository);

        await expect(getTaskByIdUseCase.execute(999)).rejects.toThrow();
    })

    test("Should delete task", async () => {
        const createTaskUseCase = new CreateTaskUseCase(taskRepository, taskFactory);
        const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

        await createTaskUseCase.execute({
            title: "Task to delete",
            description: "Description",
            userId: testUserId
        });

        await deleteTaskUseCase.execute(1);

        expect(await taskRepository.findById(1)).toBeNull();
    })

    test("Should get all tasks", async () => {
        const createTaskUseCase = new CreateTaskUseCase(taskRepository, taskFactory);
        const getAllTasksUseCase = new GetAllTasksUseCase(taskRepository);

        await createTaskUseCase.execute({
            title: "Task 1",
            description: "Description 1",
            userId: testUserId
        });

        await createTaskUseCase.execute({
            title: "Task 2",
            description: "Description 2",
            userId: testUserId
        });

        const result = await getAllTasksUseCase.execute();

        expect(result).toHaveLength(2);
        expect(result[0].title).toBe("Task 1");
        expect(result[1].title).toBe("Task 2");
    });
});
