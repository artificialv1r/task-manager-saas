// src/controllers/list.js
const listModel = require("../models/list");

const createList = async (req, res) => {
  const { name, board_id, position } = req.body;

  try {
    const newList = await listModel.create(name, board_id, position);
    res.json(newList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createList,
};
