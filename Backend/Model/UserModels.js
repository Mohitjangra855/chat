const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  profilepic: {
    type: String,
    required: true,
    default: "",
  },
},{Timestamp:true});
const User = mongoose.model("User",userSchema);

module.exports = User;
