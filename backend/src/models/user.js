// src/models/user.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");

const userModel = {
  findByUsername: async (username) => {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return result.rows[0];
  },

  create: async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *",
      [username, hashedPassword, "user"]
    );
    return result.rows[0];
  },

  verifyPassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },
};

module.exports = userModel;
