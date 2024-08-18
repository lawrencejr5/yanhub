const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
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
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "undone",
    },
  },
  {
    timestamps: true,
  }
);

const videosModel = mongoose.model("Videos", videoSchema);
module.exports = videosModel;
