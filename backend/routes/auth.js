const express = require("express");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();

// const db = new sqlite3.Database("./db/database.db");

// Create users table
// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     email TEXT UNIQUE,
//     password TEXT
//   )`);
// });

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "my-app", // Replace with your MySQL database name
});

// Create users table if not exists
db.query(
  `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
)`,
  (err, results) => {
    if (err) {
      console.error("Error creating users table:", err);
    }
  }
);

// Signup route
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, hashedPassword], (err, results) => {
    if (err) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(201).json({ message: "User created successfully" });
  });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    const user = results[0];
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email, id: user.id },
    });
  });
});

module.exports = router;
