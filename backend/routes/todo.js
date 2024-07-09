const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "my-app", // Replace with your MySQL database name
});

// Create todos table if not exists
db.query(
  `CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  title VARCHAR(255),
  completed BOOLEAN DEFAULT false,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
)`,
  (err, results) => {
    if (err) {
      console.error("Error creating todos table:", err);
    }
  }
);

// Add a new todo
router.post("/add", (req, res) => {
  const { userId, title } = req.body;
  const sql = "INSERT INTO todos (userId, title) VALUES (?, ?)";
  db.query(sql, [userId, title], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res
      .status(201)
      .json({ message: "Todo added successfully", todoId: results.insertId });
  });
});

// Get all todos for a user
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = "SELECT * FROM todos WHERE userId = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
});

// Update a todo
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const sql = "UPDATE todos SET title = ?, completed = ? WHERE id = ?";
  db.query(sql, [title, completed, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json({ message: "Todo updated successfully" });
  });
});

// Delete a todo
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM todos WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  });
});

module.exports = router;
