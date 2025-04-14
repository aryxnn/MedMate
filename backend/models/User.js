const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { // Add the name field here
    type: String,
    required: true,  // Ensure name is required
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
