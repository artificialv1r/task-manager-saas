// src/models/task.js
const db = require("../config/db");

const taskModel = {
  create: async (title, description, listId, position) => {
    const result = await db.query(
      "INSERT INTO tasks (title, description, list_id, position) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, listId, position]
    );
    return result.rows[0];
  },

  findAll: async () => {
    const result = await db.query("SELECT * FROM tasks");
    return result.rows;
  },

  findByListId: async (listId) => {
    const result = await db.query(
      "SELECT * FROM tasks WHERE list_id = $1 ORDER BY position",
      [listId]
    );
    return result.rows;
  },
};

module.exports = taskModel;
