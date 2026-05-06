import { fn as jestFn } from 'jest-mock';
import { TaskFactory } from "../../../../src/domain/tasks/factories/taskFactory.ts";
import { CreateTaskHandler } from "../../../../src/application/tasks/commandHandlers/createTaskHandler";
import { UpdateTaskHandler } from "../../../../src/application/tasks/commandHandlers/updateTaskHandler";
import { DeleteTaskHandler } from "../../../../src/application/tasks/commandHandlers/deleteTaskHandler";
import { GetTaskByIdHandler } from "../../../../src/application/tasks/queryHandlers/getTaskByIdHandler";
import { GetAllTasksHandler } from "../../../../src/application/tasks/queryHandlers/getAllTasksHandler";
import { CreateTaskCommand } from "../../../../src/application/tasks/applicationRequires/commands/createTaskCommand.ts";
import { UpdateTaskCommand } from "../../../../src/application/tasks/applicationRequires/commands/updateTaskCommand.ts";
import { DeleteTaskCommand } from "../../../../src/application/tasks/applicationRequires/commands/deleteTaskCommand.ts";
import { GetTaskByIdQuery } from "../../../../src/application/tasks/applicationRequires/queries/getTaskByIdQuery.ts";
import { GetAllTasksQuery } from "../../../../src/application/tasks/applicationRequires/queries/getAllTasksQuery.ts";
import { TASK_PRIORITY, TASK_STATUS } from "../../../../src/domain/constants/tasks/taskConsts.ts";
import { NotFoundError } from "../../../../src/application/errors/applicationErrors.ts";

class InMemoryTaskRepository {
    constructor() {
        this.tasks = [];
        this.currentId = 1;
    }

    async create(taskEntity) {
        taskEntity.id = this.currentId++;
        this.tasks.push(taskEntity);
        return taskEntity;
    }

    async getAll() {
        return [...this.tasks];
    }

    async getById(id) {
        return this.tasks.find((t) => t.id === Number(id)) || null;
    }

    async update(id, taskEntity) {
        const index = this.tasks.findIndex((t) => t.id === Number(id));
        if (index !== -1) {
            this.tasks[index] = taskEntity;
        }
        return taskEntity;
    }

    async delete(id) {
        const index = this.tasks.findIndex((t) => t.id === Number(id));
        if (index === -1) return false;
        this.tasks.splice(index, 1);
        return true;
    }

    async findByTitle(title) {
        return this.tasks.find((t) => t.title === title) || null;
    }

    async countByStatus(status) {
        return this.tasks.filter((t) => t.status === status).length;
    }
}

describe("Task handlers (CQS)", () => {
    let taskRepository;
    let taskFactory;
    let createTaskHandler;
    let updateTaskHandler;
    let deleteTaskHandler;
    let getTaskByIdHandler;
    let getAllTasksHandler;
    let eventBusMock;
    let notificationServiceMock;

    beforeEach(() => {
        taskRepository = new InMemoryTaskRepository();
        taskFactory = new TaskFactory(taskRepository);
        eventBusMock = { publish: jestFn() };
        notificationServiceMock = { notifyTaskDeleted: jestFn() };
        createTaskHandler = new CreateTaskHandler(taskRepository, taskFactory, eventBusMock);
        updateTaskHandler = new UpdateTaskHandler(taskRepository, eventBusMock);
        deleteTaskHandler = new DeleteTaskHandler(taskRepository, notificationServiceMock);
        getTaskByIdHandler = new GetTaskByIdHandler(taskRepository);
        getAllTasksHandler = new GetAllTasksHandler(taskRepository);
    });

    test("creates task and returns id", async () => {
        const command = new CreateTaskCommand("Test Task", "Test Description");
        const id = await createTaskHandler.execute(command);

        expect(id).toBe(1);
    });

    test("updates existing task", async () => {
        const createId = await createTaskHandler.execute(
            new CreateTaskCommand("Original", "Original description")
        );

        await updateTaskHandler.execute(
            new UpdateTaskCommand(
                createId,
                "Updated Title",
                "Updated Description",
                TASK_STATUS.IN_PROGRESS,
                TASK_PRIORITY.HIGH
            )
        );

        const updated = await taskRepository.getById(createId);
        expect(updated.title).toBe("Updated Title");
        expect(updated.description).toBe("Updated Description");
        expect(updated.status).toBe(TASK_STATUS.IN_PROGRESS);
        expect(updated.priority).toBe(TASK_PRIORITY.HIGH);
    });

    test("throws when updating missing task", async () => {
        await expect(
            updateTaskHandler.execute(new UpdateTaskCommand(999, "Updated Title"))
        ).rejects.toThrow(NotFoundError);
    });

    test("deletes task", async () => {
        const id = await createTaskHandler.execute(
            new CreateTaskCommand("Task to delete", "Description")
        );

        await deleteTaskHandler.execute(new DeleteTaskCommand(id));
        const task = await taskRepository.getById(id);

        expect(task).toBeNull();
    });

    test("query by id returns read dto", async () => {
        const id = await createTaskHandler.execute(
            new CreateTaskCommand("Task 1", "Description 1")
        );

        const result = await getTaskByIdHandler.execute(new GetTaskByIdQuery(id));

        expect(result.id).toBe(id);
        expect(result.title).toBe("Task 1");
        expect(result).toHaveProperty("createdAt");
    });

    test("query all returns read dto list", async () => {
        await createTaskHandler.execute(new CreateTaskCommand("Task 1", "Description 1"));
        await createTaskHandler.execute(new CreateTaskCommand("Task 2", "Description 2"));

        const result = await getAllTasksHandler.execute(new GetAllTasksQuery());

        expect(result).toHaveLength(2);
        expect(result[0]).toHaveProperty("id");
        expect(result[0]).toHaveProperty("title");
        expect(result[1].title).toBe("Task 2");
    });
});
