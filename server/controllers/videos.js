const Video = require("../models/videos");

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.status(200).json({ msg: "Success", videos });
  } catch (err) {
    res.status(500).json({ msg: "An error occured" });
  }
};
const getVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const videos = await Video.findById(id);

    if (!videos)
      return res.status(404).json({ msg: `Video with id: ${id} not found` });

    res.status(200).json({ msg: "Success", videos });
  } catch (err) {
    res.status(500).json({ msg: "An error occured" });
  }
};
const createVideo = async (req, res) => {
  try {
    const { show, ep, duration, status } = req.body;
    const { userId } = req.user;

    if (!show || !ep)
      return res.status(501).json({ msg: "Required fields cannot be empty" });

    const dataObj = { show, ep, duration, status, createdBy: userId };
    const createdVideo = await Video.create({ ...dataObj });

    res.status(200).json({ msg: "created", createdVideo });
  } catch (err) {
    res.status(500).json({ msg: "An error occured" });
  }
};
const updateVideo = async (req, res) => {
  try {
    const {
      params: { id },
      body: { show, ep, duration, type, users, status },
    } = req;

    if (!show & !ep & !duration & !type & !users & !status)
      return res.status(501).json({ msg: "All fields cannot be empty" });

    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!updatedVideo)
      return res.status(404).json({ msg: `Video with id: ${id} not found` });

    res.status(200).json({ msg: "updated", updatedVideo });
  } catch (err) {
    res.status(500).json({ msg: "An error occured" });
  }
};
const delVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVideo = await Video.findByIdAndDelete(id);
    if (!deletedVideo)
      return res.status(400).json({ msg: `No show with id: ${id}` });

    res.status(200).json({ msg: "deleted", deletedVideo: id });
  } catch (err) {
    res.status(500).json({ msg: "An error occured" });
  }
};

module.exports = { getAllVideos, getVideo, createVideo, updateVideo, delVideo };
