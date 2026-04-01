import request from "supertest";
import app from "../../src/server/app.js";
import pool from "../../src/infrastructure/pool.js";

beforeEach(async () => {
    await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
});

afterAll(async () => {
    await pool.end();
});

describe("Users API flows", () => {

    test("CREATE + GET user", async () => {
        const createRes = await request(app)
            .post("/users")
            .send({
                username: "testuser",
                email: "test@gmail.com",
                password: "123456"
            });

        expect(createRes.status).toBe(201);

        const userId = createRes.body.id;

        const getRes = await request(app).get(`/users/${userId}`);

        expect(getRes.status).toBe(200);
        expect(getRes.body.id).toBe(userId);
        expect(getRes.body.username).toBe("testuser");
    });

    test("CREATE + UPDATE user", async () => {
        const createRes = await request(app)
            .post("/users/")
            .send({
                username: "testuser",
                email: "test@gmail.com",
                password: "123456"
            });

        expect(createRes.status).toBe(201);

        const userId = createRes.body.id;
        console.log(userId);

        const updateRes = await request(app)
            .patch(`/users/${userId}`)
            .send({
                username: "updatedUser"
            });

        expect(updateRes.status).toBe(200);

        const getRes = await request(app).get(`/users/${userId}`);

        expect(getRes.status).toBe(200);
        expect(getRes.body.username).toBe("updatedUser");
    });

    test("CREATE + DELETE user", async () => {
        const createRes = await request(app)
            .post("/users/")
            .send({
                username: "testuser",
                email: "test@gmail.com",
                password: "123456"
            });

        expect(createRes.status).toBe(201);

        const userId = createRes.body.id;

        const deleteRes = await request(app)
            .delete(`/users/${userId}`);

        expect(deleteRes.status).toBe(204);

        const getRes = await request(app).get(`/users/${userId}`);

        expect(getRes.status).toBe(404);
    });

    test("CREATE + CREATE + UPDATE to existing username should fail", async () => {
        const user1Res = await request(app)
            .post("/users/")
            .send({
                username: "userr1",
                email: "user1@gmail.com",
                password: "123456"
            });

        expect(user1Res.status).toBe(201);

        const user2Res = await request(app)
            .post("/users")
            .send({
                username: "userr2",
                email: "user2@gmail.com",
                password: "123456"
            });

        expect(user2Res.status).toBe(201);

        const user2Id = user2Res.body.id;

        const updateRes = await request(app)
            .patch(`/users/${user2Id}`)
            .send({
                username: "userr1"
            });

        expect(updateRes.status).toBe(409);
    });
});