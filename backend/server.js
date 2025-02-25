// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Inicijalizacija aplikacije
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Rute
const authRoutes = require("./src/routes/auth");
const boardRoutes = require("./src/routes/board");
const listRoutes = require("./src/routes/list");
const taskRoutes = require("./src/routes/task");
const adminRoutes = require("./src/routes/admin");

// Primena ruta
app.use("/auth", authRoutes);
app.use("/boards", boardRoutes);
app.use("/lists", listRoutes);
app.use("/tasks", taskRoutes);
app.use("/admin", adminRoutes);

// Test ruta
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Test baze
app.get("/test-db", async (req, res) => {
  try {
    const db = require("./src/config/db");
    const result = await db.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  }
});

// Pokretanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
