const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "-------",
    },
    dob: {
      type: Date,
    },
    bio: {
      type: String,
      default: "Hey there, I'm using Yanhub",
    },
    admin: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    role: {
      type: String,
      default: "editor",
    },
    pic: {
      type: String,
      default: "user-1.png",
    },
    xp: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.methods.createJWt = function () {
  return jwt.sign({ userId: user._id, username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

userSchema.methods.comparePass = async function (pass) {
  const isMatch = await bcrypt.compare(pass, this.password);
  return isMatch;
};

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
