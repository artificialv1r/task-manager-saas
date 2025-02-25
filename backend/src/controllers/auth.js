// src/controllers/auth.js
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/auth");

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Provera da li korisnik već postoji
    const existingUser = await userModel.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Kreiranje novog korisnika
    const newUser = await userModel.create(username, password);

    // Generisanje JWT tokena
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Pronalaženje korisnika
    const user = await userModel.findByUsername(username);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Provera lozinke
    const isValid = await userModel.verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generisanje JWT tokena
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
};
