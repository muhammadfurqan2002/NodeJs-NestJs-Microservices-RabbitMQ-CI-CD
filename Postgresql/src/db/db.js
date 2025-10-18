require("dotenv").config(); // Load .env variables
const { Pool } = require("pg");

// Create a new pool instance
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/postgre-basic",
});

// Query helper
async function query(text, params) {
    const start = Date.now();

    try {
        const result = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log(`Executed query:`, { text, duration, rows: result.rowCount });
        return result;
    } catch (e) {
        console.error("Database query error:", e);
        throw e;
    }

}

module.exports = { query };
