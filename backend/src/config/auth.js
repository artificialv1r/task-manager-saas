module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "tajni_kljuc_za_razvoj",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
};
