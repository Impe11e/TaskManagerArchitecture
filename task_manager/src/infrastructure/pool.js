// db.js
import {Pool} from 'pg'
import dotenv from 'dotenv';
dotenv.config({path: "../../.env_app"});

const pool = new Pool({
    // eslint-disable-next-line no-undef
    host: process.env.DB_HOST,
    // eslint-disable-next-line no-undef
    port: process.env.DB_PORT,
    // eslint-disable-next-line no-undef
    user: process.env.DB_USER,
    // eslint-disable-next-line no-undef
    password: process.env.DB_PASSWORD,
    // eslint-disable-next-line no-undef
    database: process.env.DB_NAME,
});

export default pool;