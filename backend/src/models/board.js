// src/models/board.js
const db = require("../config/db");

const boardModel = {
  create: async (title, userId) => {
    const result = await db.query(
      "INSERT INTO boards (title, user_id) VALUES ($1, $2) RETURNING *",
      [title, userId]
    );
    return result.rows[0];
  },

  findByUserId: async (userId) => {
    const result = await db.query("SELECT * FROM boards WHERE user_id = $1", [
      userId,
    ]);
    return result.rows;
  },
};

module.exports = boardModel;
