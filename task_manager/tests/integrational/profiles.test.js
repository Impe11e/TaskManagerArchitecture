import request from "supertest";
import app from "../../dist/server/app.js";
import pool from "../../dist/infrastructure/pool.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

beforeAll(async () => {
  await sleep(7000);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      phone VARCHAR(20),
      bio TEXT
    );
  `);
});

beforeEach(async () => {
  // Очищаємо базу перед кожним тестом
  await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
});

afterAll(async () => {
  await pool.end();
});

describe("Profiles API flows", () => {
  const createTestUser = async (username, email) => {
    const res = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
      [
        username || "test_user",
        email || `test_${Date.now()}@kpi.ua`,
        "password123",
      ],
    );
    return res.rows[0].id;
  };

  test("Full Cycle: CREATE + GET + UPDATE + DELETE", async () => {
    const userId = await createTestUser("ivan_zhyla", "ivan@example.com");

    // 1. CREATE
    const createRes = await request(app)
      .post("/profiles")
      .send({ userId: userId, phone: "+380991112233", bio: "Initial Bio" });

    expect(createRes.status).toBe(201);
    const profileId = createRes.body.id;

    // 2. GET
    const getRes = await request(app).get(`/profiles/${profileId}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.phone).toBe("+380991112233");

    // 3. UPDATE
    const updateRes = await request(app)
      .patch(`/profiles/${profileId}`)
      .send({ bio: "Updated Bio" });
    expect(updateRes.status).toBe(200);

    // 4. DELETE
    const deleteRes = await request(app).delete(`/profiles/${profileId}`);
    expect(deleteRes.status).toBe(204);

    // 5. GET (Should be 404)
    const finalGet = await request(app).get(`/profiles/${profileId}`);
    expect(finalGet.status).toBe(404);
  });

  test("CREATE profile for existing userId should fail (409)", async () => {
    const userId = await createTestUser("ronaldo_fan", "cr7@kpi.ua");

    await request(app)
      .post("/profiles")
      .send({ userId: userId, phone: "+380991112233", bio: "First" });

    const secondRes = await request(app)
      .post("/profiles")
      .send({ userId: userId, phone: "+380995554433", bio: "Second" });

    expect(secondRes.status).toBe(409);
  });
});
