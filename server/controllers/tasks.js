const Task = require("../models/tasks");
const Video = require("../models/videos");
const User = require("../models/users");
const Show = require("../models/shows");

const getAllTasks = async (req, res) => {
  try {
    const { simplified } = req.query;
    const tasks = await Task.find({});

    const simpTasks = await Promise.all(
      tasks.map(async (task) => {
        const video = await Video.findOne({ _id: task.vidId });
        const user = await User.findOne({ _id: task.assignedBy });
        const show = await Show.findOne({ _id: video.show });

        const users = await Promise.all(
          task.assignedTo.map(async (user) => {
            const usr = await User.findOne(
              { _id: user },
              { _id: 0, username: 1 }
            );
            return usr ? usr.username : "unknown";
          })
        );
        const simpTask = {
          ...task._doc,
          show: show.show,
          ep: video.ep,
          duration: video.duration,
          assignedBy: user.username,
          assignedToNames: users,
        };
        return simpTask;
      })
    );

    if (simplified)
      return res.status(200).json({ msg: "Success", task: simpTasks });

    res.status(200).json({ msg: "Success", rowCount: tasks.length, tasks });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const getTask = async (req, res) => {
  try {
    const {
      params: { id },
      query: { simplified },
    } = req;

    const task = await Task.find({ assignedTo: [id] });
    const video = await Video.findOne({ _id: task.vidId });
    const user = await User.findOne({ _id: task.assignedBy });

    // Getting all usernames using their user ids
    const users = await Promise.all(
      task.assignedTo.map(async (user) => {
        const usr = await User.findOne({ _id: user }, { _id: 0, username: 1 });
        return usr ? usr.username : "unknown";
      })
    );

    if (!task) return res.status(404).json({ msg: `No task with id: ${id}` });

    // Creating a simplified task array
    const simpTask = {
      ...task._doc,
      show: video.show,
      ep: video.ep,
      duration: video.duration,
      assignedBy: user.username,
      assignedTo: users,
    };
    if (simplified)
      return res.status(200).json({ msg: "Success", task: simpTask });

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

    const TaskExists = await Task.findOne({ vidId, type });
    if (TaskExists) {
      const updatedTask = await Task.updateOne(
        { vidId, type },
        { assignedTo },
        { new: true, runValidators: true }
      );
      return res.status(200).json({ msg: "Task was updated", updatedTask });
    }

    const dataObj = { type, vidId, assignedTo, assignedBy: userId };
    const createdTask = await Task.create({ ...dataObj });

    if (createdTask) {
      await Video.findByIdAndUpdate(vidId, { status: "ongoing" });
    }

    res
      .status(200)
      .json({ msg: "Task has been assigned successfully", createdTask });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const updateTask = async (req, res) => {
  try {
    const {
      params: { id },
      query: { complete },
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

    if (complete === "true") {
      if (updatedTask.type === "finishing") {
        await Video.findByIdAndUpdate(updatedTask.vidId, {
          status: "completed",
        });
        return res
          .status(200)
          .json({ msg: "Video has been finished", updatedTask });
      }
    }

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
