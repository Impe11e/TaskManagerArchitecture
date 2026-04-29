import { Pool } from "pg";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

interface Env {
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const envfile: string =
  process.env.NODE_ENV === "test" ? ".env_tpool" : ".env_pool";

dotenv.config({
  path: path.resolve(__dirname, "../../", envfile),
});

const env = process.env as unknown as Env;

const pool: Pool = new Pool({
  // eslint-disable-next-line no-undef
  host: env.DB_HOST,
  // eslint-disable-next-line no-undef
  port: Number(env.DB_PORT),
  // eslint-disable-next-line no-undef
  user: env.DB_USER,
  // eslint-disable-next-line no-undef
  password: env.DB_PASSWORD,
  // eslint-disable-next-line no-undef
  database: env.DB_NAME,
});

export default pool;
