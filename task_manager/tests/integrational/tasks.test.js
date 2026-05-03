import request from "supertest";
import app from "../../src/server/app.ts";
import { pool } from "../../src/infrastructure/pool.ts";

beforeAll(async () => {
    await pool.query('TRUNCATE TABLE tasks RESTART IDENTITY CASCADE');
});

beforeEach(async () => {
    await pool.query('TRUNCATE TABLE tasks RESTART IDENTITY CASCADE');
});

afterAll(async () => {
    await pool.end();
});

describe("Tasks API flows", () => {

    test("CREATE + GET task", async () => {
        const createTaskRes = await request(app)
            .post("/tasks")
            .send({
                title: "Test Task",
                description: "Test Description"
            });

        expect(createTaskRes.status).toBe(201);
        const taskId = createTaskRes.body.id;

        const getTaskRes = await request(app).get(`/tasks/${taskId}`);

        expect(getTaskRes.status).toBe(200);
        expect(getTaskRes.body.id).toBe(taskId);
        expect(getTaskRes.body.title).toBe("Test Task");
    });

    test("CREATE + UPDATE task", async () => {
        const createTaskRes = await request(app)
            .post("/tasks")
            .send({
                title: "Original Title",
                description: "Original Description",
                status: "NEW"
            });

        expect(createTaskRes.status).toBe(201);
        const taskId = createTaskRes.body.id;

        const updateRes = await request(app)
            .put(`/tasks/${taskId}`)
            .send({
                title: "Updated Title",
                status: "IN_PROGRESS"
            });

        expect(updateRes.status).toBe(204);

        const getRes = await request(app).get(`/tasks/${taskId}`);

        expect(getRes.status).toBe(200);
        expect(getRes.body.title).toBe("Updated Title");
        expect(getRes.body.status).toBe("IN_PROGRESS");
    });

    test("CREATE + DELETE task", async () => {
        const createTaskRes = await request(app)
            .post("/tasks")
            .send({
                title: "Task to Delete",
                description: "Will be deleted"
            });

        expect(createTaskRes.status).toBe(201);
        const taskId = createTaskRes.body.id;

        const deleteRes = await request(app)
            .delete(`/tasks/${taskId}`);

        expect(deleteRes.status).toBe(204);

        const getRes = await request(app).get(`/tasks/${taskId}`);

        expect(getRes.status).toBe(404);
    });

    test("GET all tasks", async () => {
        await request(app)
            .post("/tasks")
            .send({
                title: "Task 1",
                description: "First task"
            });

        await request(app)
            .post("/tasks")
            .send({
                title: "Task 2",
                description: "Second task"
            });

        const getRes = await request(app).get("/tasks");

        expect(getRes.status).toBe(200);
        expect(Array.isArray(getRes.body)).toBe(true);
        expect(getRes.body.length).toBe(2);
    });

    test("CREATE task with title less than 3 chars should fail", async () => {
        const createTaskRes = await request(app)
            .post("/tasks")
            .send({
                title: "AB",
                description: "Short title"
            });

        expect(createTaskRes.status).toBe(400);
    });

    test("CREATE task with status and priority", async () => {
        const createTaskRes = await request(app)
            .post("/tasks")
            .send({
                title: "Important Task",
                description: "High priority task",
                status: "IN_PROGRESS",
                priority: "HIGH"
            });

        expect(createTaskRes.status).toBe(201);
        expect(createTaskRes.body).toHaveProperty("id");
    });

});
