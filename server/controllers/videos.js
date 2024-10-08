const Video = require("../models/videos");
const Task = require("../models/tasks");

const getAllVideos = async (req, res) => {
  try {
    const { show, status } = req.query;

    const queryObj = {};

    if (show) queryObj.show = show;

    if (status) queryObj.status = status;

    const videos = await Video.find(queryObj)
      .populate("show", "show")
      .sort("-createdAt");
    res.status(200).json({ msg: "Success", rowCount: videos.length, videos });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const getVideo = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const video = await Video.findById(id)
      .populate("show", "show")
      .sort("-createdAt");

    if (!video)
      return res.status(404).json({ msg: `Video with id: ${id} not found` });

    res.status(200).json({ msg: "Success", video });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const createVideo = async (req, res) => {
  try {
    const { showId, ep, duration, status } = req.body;
    const { userId } = req.user;

    if (!showId || !ep)
      return res.status(501).json({ msg: "Required fields cannot be empty" });

    const dataObj = { show: showId, ep, duration, status, createdBy: userId };
    const createdVideo = await Video.create({ ...dataObj });

    res.status(200).json({ msg: "New video created", createdVideo });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
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
    res.status(500).json({ msg: "An error occured", err });
  }
};

const delVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVideo = await Video.findByIdAndDelete(id);
    if (deletedVideo) {
      await Task.deleteMany({ video: id });
    }
    if (!deletedVideo)
      return res.status(400).json({ msg: `No show with id: ${id}` });

    res.status(200).json({ msg: "deleted", deletedVideo: id });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

module.exports = {
  getAllVideos,
  getVideo,
  createVideo,
  updateVideo,
  delVideo,
};
