import { config } from "dotenv"; config();
import mysql from "mysql2"

// creates the mysql pool with resepctive database information
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

export default pool.promise() 