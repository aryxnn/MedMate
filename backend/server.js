const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication Routes
app.use("/api/auth", require("./routes/auth"));  // Add authentication routes

// Diagnosis Routes
app.use("/api/diagnose", require("./routes/diagnosis"));

// Start Server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
