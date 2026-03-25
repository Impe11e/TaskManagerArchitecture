// db.js
import {Pool} from 'pg'

const pool = new Pool({
    user: 'mike',
    host: 'localhost',
    database: 'tasker_db',
    password: 'mike',
    port: 5432,
});

export default pool;