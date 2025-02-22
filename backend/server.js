require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const { verifyToken, authorizeRole } = require("./middleware");

// Middleware
app.use(express.json()); // Parsiranje JSON requesta
app.use(cors()); // Omogućava CORS za frontend komunikaciju
app.use(morgan("dev")); // Logger

// Test ruta
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Test baze
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  }
});

// Testiranje konekcije sa tabelom
app.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// Registracija korisnika
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Proveri da li korisnik već postoji
    const existingUser = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash lozinke
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upis novog korisnika u bazu
    const newUser = await db.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *",
      [username, hashedPassword, "user"]
    );

    // Kreiraj JWT token
    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Prijava korisnika
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).send("User not found");
    }

    const isValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isValid) {
      return res.status(400).send("Invalid password");
    }

    // Dodaj role u payload tokena
    const token = jwt.sign(
      { id: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// Ruta koja je dostupna samo za administratore
app.get("/admin", verifyToken, authorizeRole(["admin"]), (req, res) => {
  res.send("Welcome, Admin!");
});

// Kreiraj board
app.post("/boards", verifyToken, async (req, res) => {
  const { name } = req.body;
  try {
    const newBoard = await db.query(
      "INSERT INTO boards (title, user_id) VALUES ($1, $2) RETURNING *",
      [name, req.user.id]
    );
    res.json(newBoard.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// Kreiraj listu
app.post("/lists", verifyToken, async (req, res) => {
  const { name, board_id, position } = req.body;
  try {
    const newList = await db.query(
      "INSERT INTO lists (title, board_id, position) VALUES ($1, $2, $3) RETURNING *",
      [name, board_id, position]
    );
    res.json(newList.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// Kreiraj zadatak
app.post("/tasks", verifyToken, async (req, res) => {
  const { title, description, list_id, position } = req.body;
  try {
    const newTask = await db.query(
      "INSERT INTO tasks (title, description, list_id, position) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, list_id, position]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// Pokretanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
