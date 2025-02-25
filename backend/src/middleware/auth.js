// src/middleware/auth.js
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/auth");

// Middleware za verifikaciju JWT tokena
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware za autorizaciju uloga
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    next();
  };
};

module.exports = {
  verifyToken,
  authorizeRole,
};
