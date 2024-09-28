const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    video: {
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
    started: {
      type: Date,
    },
    ended: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["undone", "ongoing", "completed"],
      default: "ongoing",
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("Tasks", taskSchema);
module.exports = taskModel;
