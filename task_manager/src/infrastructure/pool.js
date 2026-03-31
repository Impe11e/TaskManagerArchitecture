// db.js
import {Pool} from 'pg'
import dotenv from 'dotenv';

let envfile = ".env_pool"
// eslint-disable-next-line no-undef
if(process.env.NODE_ENV === 'test') {
    envfile = ".env_tpool";
}
dotenv.config({path: `../../${envfile}`});

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