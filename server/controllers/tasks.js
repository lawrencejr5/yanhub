const Task = require("../models/tasks");
const Video = require("../models/videos");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ msg: "Success", rowCount: tasks.length, tasks });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id });
    if (!task) return res.status(404).json({ msg: `No task with id: ${id}` });

    res.status(200).json({ msg: "Success", task });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const setTask = async (req, res) => {
  try {
    const {
      user: { userId },
      body: { type, vidId, assignedTo },
    } = req;

    if (!type || !vidId || !assignedTo)
      return res.status(501).json({ msg: "Fill in required fields" });

    const dataObj = { type, vidId, assignedTo, assignedBy: userId };
    const createdTask = await Task.create({ ...dataObj });

    if (createdTask) {
      await Video.findByIdAndUpdate(vidId, { status: "ongoing" });
    }

    res.status(200).json({ msg: "created", createdTask });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const updateTask = async (req, res) => {
  try {
    const {
      params: { id },
      body: { type, vidId, assignedTo, status: stat },
    } = req;

    if (!type && !vidId && !assignedTo && !stat)
      return res.status(500).json({ msg: "Wetin you come dey update??" });

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!updatedTask)
      return res
        .status(500)
        .json({ msg: `Couldn't find any task with id: ${id}` });

    res.status(200).json({ msg: "updated", updatedTask });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const delTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    if (!task)
      return res.status(500).json({ msg: `No task found with id: ${id}` });

    res.status(200).json({ msg: "deleted", deletedTask: id });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

module.exports = { getAllTasks, getTask, setTask, updateTask, delTask };
