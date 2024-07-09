const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
// const loginRoutes = require("./routes/login");
const todoRoutes = require("./routes/todo");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

// Database setup
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "my-app", // Replace with your MySQL database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
