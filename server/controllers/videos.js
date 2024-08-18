const Video = require("../models/videos");

const getAllVideos = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};
const getVideo = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};
const createVideo = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};
const updateVideo = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};
const delVideo = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllVideos, getVideo, createVideo, updateVideo, delVideo };
