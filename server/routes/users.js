const express = require("express");
const router = express.Router();

const {
  register,
  login,
  updatePassword,
  getAllUsers,
  getUser,
  editUser,
  delUser,
} = require("../controllers/users");

router.post("/login", login);
router.post("/register", register);
router.patch("/update-pass/:id", updatePassword);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/:id", editUser);
router.delete("/:id", delUser);

module.exports = router;
