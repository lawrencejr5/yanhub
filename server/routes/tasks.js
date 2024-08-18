const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTask,
  setTask,
  updateTask,
  delTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(setTask);
router.route("/:id").get(getTask).patch(updateTask).delete(delTask);

module.exports = router;
