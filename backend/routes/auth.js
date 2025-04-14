const express = require("express");
const { register, login } = require("../controllers/auth");
const router = express.Router();  // Make sure router is being used

// Register Route
router.post("/register", register);

// Login Route
router.post("/login", login);

module.exports = router;  // Ensure router is exported correctly
