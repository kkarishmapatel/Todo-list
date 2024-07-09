const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // Updated to bcryptjs
const authRoutes = require("./routes/auth");
const db = authRoutes.db;
// Signup route
router.post("/signup", (req, res) => {
  console.log("singup call");
  const { name, email, password } = req.body;
  console.log("name ", name);
  console.log("email ", email);
  console.log("password ", password);
  const hashedPassword = bcrypt.hashSync(password, 10); // Updated to bcryptjs
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  // db.run(sql, [name, email, hashedPassword], function (err) {
  db.query(sql, [name, email, hashedPassword], (err, results) => {
    if (err) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(201).json({ message: "User created successfully" });
  });
});

// Login route
router.post("/login", (req, res) => {
  console.log("login call");
  const { email, password } = req.body;
  console.log("email ", email);
  console.log("password ", password);
  const sql = "SELECT * FROM users WHERE email = ?";

  // db.get(sql, [email], (err, row) => {
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    // if (!row || !bcrypt.compareSync(password, row.password)) {
    // Updated to bcryptjs
    const user = results[0];

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    res.status(200).json({
      message: "Login successful",
      //   user: { name: row.name, email: row.email },
      user: { name: user.name, email: user.email },
    });
  });
});

module.exports = router;
