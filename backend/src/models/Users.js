const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "Account already exists with this username"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Account already exists with this email address"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
