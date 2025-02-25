// src/routes/admin.js
const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middleware/auth");

router.get("/", verifyToken, authorizeRole(["admin"]), (req, res) => {
  res.send("Welcome, Admin!");
});

module.exports = router;
