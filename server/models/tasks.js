const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "shooting",
        "cutting & sound",
        "subtitling",
        "highlight",
        "finishing",
        "rendering",
        "scaling",
      ],
      required: true,
    },
    show: {
      type: String,
      required: true,
    },
    ep: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    users: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "undone",
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("Tasks", taskSchema);
module.exports = taskModel;
