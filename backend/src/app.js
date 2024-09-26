// backend/src/app.js

const express = require("express");
const sequelize = require("./config/config"); // Import the sequelize instance
// const settle = require("settle");

const app = express();

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
// settle.setCredentials({ 'id': 'admin', 'password': 'admin' });

// settle.setMode('test');
// settle.
// Import routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const contributionRoutes = require("./routes/contributionRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/contributions", contributionRoutes);
app.use("/reviews", reviewRoutes);

module.exports = app;
