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

const softDeleteBoard = async (req, res) => {
  const { boardId } = req.body;
  const userId = req.user.id;

  try {
    const deletedBoard = await boardModel.softDelete(boardId, userId);

    if (!deletedBoard) {
      res
        .status(404)
        .json({ message: "Tabla nije pronadjena ili nemate pravo brisanja " });
    }
    res.json({ message: "Tabla uspesno obrisana", board: deletedBoard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createBoard,
  softDeleteBoard,
};
