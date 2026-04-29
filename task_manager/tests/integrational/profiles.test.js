import request from "supertest";
import app from "../../dist/server/app.js";
import pool from "../../dist/infrastructure/pool.js";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

beforeAll(async () => {
    await sleep(7000); 

    await pool.query(`
        CREATE TABLE IF NOT EXISTS profiles (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL UNIQUE,
            phone VARCHAR(20),
            bio TEXT
        );
    `);
});

beforeEach(async () => {
    await pool.query('TRUNCATE TABLE profiles RESTART IDENTITY CASCADE');
});

afterAll(async () => {
    await pool.end();
});

describe("Profiles API flows", () => {
    test("Full Cycle: CREATE + GET + UPDATE + DELETE", async () => {
        // 1. CREATE
        const createRes = await request(app)
            .post("/profiles")
            .send({ userId: 1, phone: "+380991112233", bio: "Initial" });
        expect(createRes.status).toBe(201);
        const id = createRes.body.id;

        // 2. GET
        const getRes = await request(app).get(`/profiles/${id}`);
        expect(getRes.status).toBe(200);
        expect(getRes.body.phone).toBe("+380991112233");

        // 3. UPDATE
        const updateRes = await request(app)
            .patch(`/profiles/${id}`)
            .send({ bio: "New Bio" });
        expect(updateRes.status).toBe(200);

        // 4. DELETE
        const deleteRes = await request(app).delete(`/profiles/${id}`);
        expect(deleteRes.status).toBe(204);

        // 5. GET (Should be 404)
        const finalGet = await request(app).get(`/profiles/${id}`);
        expect(finalGet.status).toBe(404);
    });

    test("CREATE profile for existing userId should fail (409)", async () => {
        await request(app)
            .post("/profiles")
            .send({ userId: 5, phone: "+380991112233", bio: "First" });

        const secondRes = await request(app)
            .post("/profiles")
            .send({ userId: 5, phone: "+380995554433", bio: "Second" });

        expect(secondRes.status).toBe(409); 
    });
});