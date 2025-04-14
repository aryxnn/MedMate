const express = require("express");
const router = express.Router();
const { diagnose, getHistory } = require("../controllers/diagnosis");
const authMiddleware = require("../middleware/auth"); // ✅ Import the middleware


// 🔒 Protect this route so only logged-in users can access it
router.post("/", authMiddleware, diagnose);
router.get("/history", authMiddleware, getHistory); // ✅ New route

module.exports = router;
