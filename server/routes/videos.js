const express = require("express");
const router = express.Router();

const {
  getAllVideos,
  getVideo,
  createVideo,
  updateVideo,
  delVideo,
} = require("../controllers/videos");

router.get("/", getAllVideos);
router.get("/:id", getVideo);
router.post("/", createVideo);
router.patch("/:id", updateVideo);
router.delete("/:id", delVideo);

module.exports = router;
