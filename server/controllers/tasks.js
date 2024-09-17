const Task = require("../models/tasks");
const Video = require("../models/videos");

const getAllTasks = async (req, res) => {
  try {
    const { search } = req.query;
    if (search) {
      // $or: [{ name: new RegExp(query, "i") }, { city: new RegExp(query, "i") }];
      const results = await Task.find()
        .populate({
          path: "video",
          select: "ep duration",
          populate: {
            path: "show",
            select: "show",
          },
        })
        .populate("assignedTo", "username pic")
        .exec();
      const filteredResults = results.filter((task) => {
        const epMatch = task.video.ep.match(new RegExp(search, "i"));
        const showMatch =
          task.video.show &&
          task.video.show.show.match(new RegExp(search, "i"));
        return epMatch || showMatch;
      });
      // const results = await Video.find({ ep: new RegExp(search, "i") });
      return res.status(200).json({ msg: "Success", tasks: filteredResults });
    }

    const tasks = await Task.find()
      .populate({
        path: "video",
        select: "ep duration",
        populate: {
          path: "show",
          select: "show",
        },
      })
      .populate("assignedTo", "username pic");

    res.status(200).json({ msg: "Success", rowCount: tasks.length, tasks });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const getTask = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const task = await Task.find({ assignedTo: [id] })
      .populate({
        path: "video",
        select: "ep duration",
        populate: {
          path: "show",
          select: "show",
        },
      })
      .populate("assignedTo", "username pic")
      .populate("assignedBy", "username");

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
      body: { type, video, assignedTo },
    } = req;

    if (!type || !video || !assignedTo)
      return res.status(501).json({ msg: "Fill in required fields" });

    const TaskExists = await Task.findOne({ video, type });
    if (TaskExists) {
      const updatedTask = await Task.updateOne(
        { video, type },
        { assignedTo },
        { new: true, runValidators: true }
      );
      return res.status(200).json({ msg: "Task was updated", updatedTask });
    }

    const dataObj = { type, video, assignedTo, assignedBy: userId };
    const createdTask = await Task.create({ ...dataObj });

    if (createdTask) {
      await Video.findByIdAndUpdate(video, { status: "ongoing" });
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
      body: { type, video, assignedTo, status: stat },
    } = req;

    if (!type && !video && !assignedTo && !stat)
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
        await Video.findByIdAndUpdate(updatedTask.video, {
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
