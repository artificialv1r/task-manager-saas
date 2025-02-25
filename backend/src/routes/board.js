// src/routes/board.js
const express = require("express");
const router = express.Router();
const boardController = require("../controllers/board");
const { verifyToken } = require("../middleware/auth");

// Rute za table
router.post("/", verifyToken, boardController.createBoard);

module.exports = router;
