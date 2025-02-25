// src/models/list.js
const db = require("../config/db");

const listModel = {
  create: async (title, boardId, position) => {
    const result = await db.query(
      "INSERT INTO lists (title, board_id, position) VALUES ($1, $2, $3) RETURNING *",
      [title, boardId, position]
    );
    return result.rows[0];
  },

  findByBoardId: async (boardId) => {
    const result = await db.query(
      "SELECT * FROM lists WHERE board_id = $1 ORDER BY position",
      [boardId]
    );
    return result.rows;
  },
};

module.exports = listModel;
