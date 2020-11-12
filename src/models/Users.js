const mongoose = require("mongoose")

const schema = mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  passwordSalt: String,
  accessLevel: String,
  timestamp: Number,
  avatar: String,
  status: String,
})

module.exports = mongoose.model("User", schema)