const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    bgImg: {
      type: String,
      default: "video-icon.jpg",
    },
    show: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const showsModel = mongoose.model("Shows", showSchema);
module.exports = showsModel;
