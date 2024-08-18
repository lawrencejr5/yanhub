const express = require("express");
const router = express.Router();

const {
  getAllShows,
  getShow,
  createShow,
  updateShow,
  delShow,
} = require("../controllers/shows");

router.route("/").get(getAllShows).post(createShow);
router.route("/:id").get(getShow).patch(updateShow).delete(delShow);

module.exports = router;
