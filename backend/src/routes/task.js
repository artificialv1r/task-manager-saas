// src/routes/task.js
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const { verifyToken } = require("../middleware/auth");

// Rute za zadatke
router.post("/", verifyToken, taskController.createTask);
router.get("/", taskController.getAllTasks);

module.exports = router;
