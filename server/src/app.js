const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.send(" Digital Heroes Lead Management API is running!");
});

module.exports = app;