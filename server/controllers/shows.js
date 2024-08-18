const Show = require("../models/shows");

const getAllShows = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};
const getShow = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};
const createShow = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};
const updateShow = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};
const delShow = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllShows, getShow, createShow, updateShow, delShow };
