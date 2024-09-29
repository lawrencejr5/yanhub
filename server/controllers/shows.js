const Show = require("../models/shows");
const Video = require("../models/videos");
const Task = require("../models/tasks");

const getAllShows = async (req, res) => {
  try {
    const allShows = await Show.find({}).populate("createdBy", "username");
    const shows = await Promise.all(
      allShows.map(async (show) => {
        const videos = await Video.find({ show: show._id });
        const completed = await Video.find({
          show: show._id,
          status: "completed",
        });
        const undone = await Video.find({ show: show._id, status: "undone" });
        const ongoing = await Video.find({ show: show._id, status: "ongoing" });
        return {
          ...show._doc,
          rowCount: videos.length,
          stats: {
            completed: completed.length,
            undone: undone.length,
            ongoing: ongoing.length,
          },
        };
      })
    );
    res.status(200).json({
      msg: "Success",
      rowCount: shows.length,
      shows,
    });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const getShow = async (req, res) => {
  try {
    const { id } = req.params;
    const shows = await Show.findById(id);

    res.status(200).json({ msg: "Success", shows });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const createShow = async (req, res) => {
  try {
    const { show, bgImg } = req.body;
    const { userId } = req.user;

    if (!show) return res.status(500).json({ msg: "Input required fields" });

    // Checking if show already exists
    const oldShow = await Show.findOne({ show });
    if (oldShow)
      return res
        .status(500)
        .json({ msg: "A show already exists with this name" });

    const dataObj = { show, bgImg, createdBy: userId };
    const createdShow = await Show.create({ ...dataObj });

    res.status(200).json({ msg: "created", createdShow });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const updateShow = async (req, res) => {
  try {
    const { id } = req.params;
    const { show, bgImg } = req.body;

    if (!show && !bgImg)
      return res.status(400).json("All fields cannot be empty");

    const updatedShow = await Show.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!updatedShow)
      return res.status(404).json({ msg: `No show with id: ${id}` });

    res.status(200).json({ msg: "updated", updatedShow });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const delShow = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedShow = await Show.findByIdAndDelete(id);
    // const tasks = await Task.find().populate("video", "_id");
    if (deletedShow) {
      const videos = await Video.find({ show: id });

      // Delete all tasks related to each video
      for (const video of videos) {
        await Task.deleteMany({ video: video._id });
      }

      // Delete all videos related to each video
      await Video.deleteMany({ show: id });
    }
    if (!deletedShow)
      return res.status(400).json({ msg: `No show with id: ${id}` });

    res.status(200).json({ msg: "deleted", deletedShow: id });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

module.exports = { getAllShows, getShow, createShow, updateShow, delShow };
