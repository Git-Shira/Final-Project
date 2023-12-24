const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  permission: String,
});

module.exports = mongoose.model("User", UserSchema);
