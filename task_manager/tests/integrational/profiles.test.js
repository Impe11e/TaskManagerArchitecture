import request from "supertest";
import app from "../../dist/server/app.js";
import pool from "../../dist/infrastructure/pool.js";

beforeEach(async () => {
  await pool.query("TRUNCATE TABLE users, profiles RESTART IDENTITY CASCADE");
});

afterAll(async () => {
  await pool.end();
});

describe("Profiles API flows", () => {
  const VALID_PHONE = "+380991112233";
  const ANOTHER_PHONE = "+380995556677";

  const createTestUser = async () => {
    const res = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
      ["testuser", "test@gmail.com", "pass123"],
    );
    return res.rows[0].id;
  };

  test("CREATE + GET profile", async () => {
    const userId = await createTestUser();
    const createRes = await request(app)
      .post("/profiles")
      .send({ userId, phone: VALID_PHONE, bio: "Test Bio" });

    expect(createRes.status).toBe(201);
    const profileId = createRes.body.id;

    const getRes = await request(app).get(`/profiles/${profileId}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.phone).toBe(VALID_PHONE);
  });

  test("CREATE + UPDATE profile", async () => {
    const userId = await createTestUser();
    const createRes = await request(app)
      .post("/profiles")
      .send({ userId, phone: VALID_PHONE, bio: "Old" });

    const profileId = createRes.body.id;

    const updateRes = await request(app)
      .patch(`/profiles/${profileId}`)
      .send({ bio: "New Bio" });

    expect(updateRes.status).toBe(200);

    const getRes = await request(app).get(`/profiles/${profileId}`);
    expect(getRes.body.bio).toBe("New Bio");
  });

  test("CREATE profile for same user twice should fail", async () => {
    const userId = await createTestUser();
    await request(app)
      .post("/profiles")
      .send({ userId, phone: VALID_PHONE, bio: "First" });

    const secondRes = await request(app)
      .post("/profiles")
      .send({ userId, phone: ANOTHER_PHONE, bio: "Second attempt" });

    expect(secondRes.status).toBe(409);
  });
});
