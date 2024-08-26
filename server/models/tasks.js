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
    vidId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Videos",
    },
    assignedTo: {
      type: [mongoose.Types.ObjectId],
      required: true,
      ref: "Users",
    },
    assignedBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    status: {
      type: String,
      enum: ["ongoing", "done"],
      default: "ongoing",
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("Tasks", taskSchema);
module.exports = taskModel;
