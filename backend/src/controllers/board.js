// src/controllers/board.js
const boardModel = require("../models/board");

const createBoard = async (req, res) => {
  const { name } = req.body;

  try {
    const newBoard = await boardModel.create(name, req.user.id);
    res.json(newBoard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createBoard,
};
