const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  name: { type: String },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  reset_password_token:{ type: String, default: '' },
  reset_password_expires:{ type: Date, default: Date.now },
  role: { type: String, default: "member" },
  date: { type: Date, default: Date.now }
})

module.exports = User = mongoose.model("users", UserSchema)
