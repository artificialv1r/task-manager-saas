const { Pool } = require("pg");
require("dotenv").config();

// Simplify the connection approach
const pool = new Pool({
  user: "postgres",
  password: "stele",
  host: "localhost",
  port: 5432,
  database: "task_manager",
});

// Test connection immediately
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => {
    console.error("Connection error", err);
    // Log more details about the error
    console.error("Error details:", err.message);
    if (err.stack) console.error("Stack:", err.stack);
  });

// Instead of exporting the pool directly, export a query function that handles errors
module.exports = {
  query: async (text, params) => {
    try {
      const client = await pool.connect();
      try {
        return await client.query(text, params);
      } finally {
        client.release();
      }
    } catch (err) {
      console.error("Query error:", err.message);
      throw err;
    }
  },
};
