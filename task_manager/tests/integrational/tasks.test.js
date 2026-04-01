import request from "supertest";
import app from "../../src/server/app.js";
import pool from "../../src/infrastructure/pool.js";

let testUserId;

beforeAll(async () => {
    await pool.query('TRUNCATE TABLE tasks RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');

    const createUserRes = await request(app)
        .post("/users")
        .send({
            username: "testuser123",
            email: "test@gmail.com",
            password: "password123"
        });

    testUserId = createUserRes.body.id;
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
                description: "Test Description",
                userId: testUserId
            });

        console.log("CREATE Response:", JSON.stringify(createTaskRes.body));
        expect(createTaskRes.status).toBe(201);

        const taskId = createTaskRes.body.id;

        console.log("GET /tasks/" + taskId);
        const getTaskRes = await request(app).get(`/tasks/${taskId}`);
        console.log("GET Response:", getTaskRes.status, JSON.stringify(getTaskRes.body));

        expect(getTaskRes.status).toBe(200);
        expect(getTaskRes.body.id).toBe(taskId);
        expect(getTaskRes.body.title).toBe("Test Task");
        expect(getTaskRes.body.userId).toBe(testUserId);
    });

    test("CREATE + UPDATE task", async () => {
        const createTaskRes = await request(app)
            .post("/tasks")
            .send({
                title: "Original Title",
                description: "Original Description",
                userId: testUserId,
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

        expect(updateRes.status).toBe(200);

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
                description: "Will be deleted",
                userId: testUserId
            });

        expect(createTaskRes.status).toBe(201);
        const taskId = createTaskRes.body.id;

        const deleteRes = await request(app)
            .delete(`/tasks/${taskId}`);

        expect(deleteRes.status).toBe(204);

        const getRes = await request(app).get(`/tasks/${taskId}`);

        expect(getRes.status).toBe(404);
    });

    test("CREATE task with invalid userId should fail", async () => {
        const createTaskRes = await request(app)
            .post("/tasks")
            .send({
                title: "Task with Invalid User",
                description: "Should fail",
                userId: 9999  
            });

        expect(createTaskRes.status).toBe(400);
    });

    test("CREATE task without userId should fail", async () => {
        const createTaskRes = await request(app)
            .post("/tasks")
            .send({
                title: "Task without User",
                description: "Should fail"
            });

        expect(createTaskRes.status).toBe(400);
    });

    test("GET all tasks", async () => {
        await request(app)
            .post("/tasks")
            .send({
                title: "Task 1",
                description: "First task",
                userId: testUserId
            });

        await request(app)
            .post("/tasks")
            .send({
                title: "Task 2",
                description: "Second task",
                userId: testUserId
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
                description: "Short title",
                userId: testUserId
            });

        expect(createTaskRes.status).toBe(400);
    });

    test("CREATE task with status and priority", async () => {
        const createTaskRes = await request(app)
            .post("/tasks")
            .send({
                title: "Important Task",
                description: "High priority task",
                userId: testUserId,
                status: "IN_PROGRESS",
                priority: "HIGH"
            });

        expect(createTaskRes.status).toBe(201);
        expect(createTaskRes.body.status).toBe("IN_PROGRESS");
        expect(createTaskRes.body.priority).toBe("HIGH");
    });

});
