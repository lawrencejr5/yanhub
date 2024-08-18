const Task = require("../models/tasks");

const getAllTasks = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};
const getTask = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};
const setTask = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};
const updateTask = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};
const delTask = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllTasks, getTask, setTask, updateTask, delTask };
