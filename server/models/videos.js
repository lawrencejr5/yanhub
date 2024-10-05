const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    show: {
      type: mongoose.Types.ObjectId,
      ref: "Shows",
      required: true,
    },
    ep: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: "00:00",
    },
    status: {
      type: String,
      default: "undone",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

const videosModel = mongoose.model("Videos", videoSchema);
module.exports = videosModel;
