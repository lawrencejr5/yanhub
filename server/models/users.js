const mongoose = require("mongoose");

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
    phone: {
      type: String,
    },
    dob: {
      type: Date,
    },
    bio: {
      type: String,
    },
    admin: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    role: {
      type: String,
    },
    pic: {
      type: String,
      default: "user-1.png",
    },
    xp: {
      type: Number,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
