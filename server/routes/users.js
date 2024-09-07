const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const {
  register,
  login,
  updatePassword,
  getAllUsers,
  getUser,
  updatePic,
  editUser,
  delUser,
} = require("../controllers/users");

router.post("/login", login);
router.post("/register", register);
router.patch("/pass", auth, updatePassword);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/avatar", auth, updatePic);
router.patch("/:id", editUser);
router.delete("/:id", delUser);

module.exports = router;
