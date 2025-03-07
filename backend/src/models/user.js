// src/models/user.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");

const userModel = {
  findByUsername: async (username) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE username = $1", [
        String(username),
      ]);
      return result.rows[0];
    } catch (err) {
      console.error("Error in findByUsername:", err.message);
      throw err;
    }
  },

  create: async (username, password) => {
    try {
      // Ensure both username and password are strings
      const usernameStr = String(username);
      const passwordStr = String(password);

      // Hash the password
      const hashedPassword = await bcrypt.hash(passwordStr, 10);

      const result = await db.query(
        "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *",
        [usernameStr, hashedPassword, "user"]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error in create:", err.message);
      throw err;
    }
  },

  verifyPassword: async (plainPassword, hashedPassword) => {
    try {
      return await bcrypt.compare(String(plainPassword), hashedPassword);
    } catch (err) {
      console.error("Error in verifyPassword:", err.message);
      throw err;
    }
  },
};

module.exports = userModel;
