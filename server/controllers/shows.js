const Show = require("../models/shows");

const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({});
    res.status(200).json({ msg: "Success", shows });
  } catch (err) {
    res.status(500).json({ msg: "An error occured" });
  }
};
const getShow = async (req, res) => {
  try {
    const { id } = req.params;
    const shows = await Show.findById(id);

    res.status(200).json({ msg: "Success", shows });
  } catch (err) {
    res.status(500).json({ msg: "An error occured" });
  }
};
const createShow = async (req, res) => {
  try {
    const { show, bgImg } = req.body;
    const { userId } = req.user;

    if (!show) return res.status(500).json({ msg: "An error occured" });

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
    res.status(500).json({ msg: "An error occured" });
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
    res.status(500).json({ msg: "An error occured" });
  }
};
const delShow = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedShow = await Show.findByIdAndDelete(id);
    if (!deletedShow)
      return res.status(400).json({ msg: `No show with id: ${id}` });

    res.status(200).json({ msg: "deleted", deletedShow: id });
  } catch (err) {
    res.status(500).json({ msg: "An error occured" });
  }
};

module.exports = { getAllShows, getShow, createShow, updateShow, delShow };
