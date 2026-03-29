// db.js
import {Pool} from 'pg'

const pool = new Pool({
    user: 'user2',
    host: 'localhost',
    database: 'mydb',
    password: 'pass',
    port: 5433,
});

export default pool;