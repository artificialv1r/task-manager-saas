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

  softDelete: async (boardId, userId) => {
    const result = await db.query(
      "UPDATE boards SET is_deleted = TRUE WHERE id = $1 AND user_id = $2 RETURNING *",
      [boardId, userId]
    );

    if (result.rows.length === 0) {
      throw new Error("Tabla nije pronađena ili nemate mogucnost brisanja");
    }
    return result.rows[0];
  },
};

module.exports = boardModel;
