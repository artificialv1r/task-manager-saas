// src/routes/list.js
const express = require("express");
const router = express.Router();
const listController = require("../controllers/list");
const { verifyToken } = require("../middleware/auth");

// Rute za liste
router.post("/", verifyToken, listController.createList);

module.exports = router;
