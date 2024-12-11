import { createPool } from 'mysql2/promise'
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from './key.js'
const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
})

export default pool