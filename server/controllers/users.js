const User = require("../models/users");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, fullname, phone, password, cpassword } = req.body;

    // Check required fields
    if (!username || !fullname || !password || !cpassword)
      return res.status(501).json({ msg: "Fill in required fields" });

    // Checking if passwords match
    if (password !== cpassword)
      return res.status(501).json({ msg: "Passwords do not match" });

    if (password.length < 6)
      return res
        .status(501)
        .json({ msg: "Password must be up to 6 characters" });

    // Check if user exists
    const oldUser = await User.findOne({ username });
    if (oldUser)
      return res.status(501).json({ msg: "Username already exists" });

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Storing user in db
    const userData = { username, fullname, phone, password: hashedPass };
    const user = await User.create({ ...userData });

    // Creating token
    const token = jwt.sign(
      { userId: user._id, username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    // Sending response
    res.status(200).json({
      msg: "registration completed",
      user: user._id,
      token,
    });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check required fields
    if (!username || !password)
      return res.status(501).json({ msg: "Fill in required fields" });

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(500).json({ msg: "User does not exist" });

    // Checking if password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(500).json({ msg: "Password not correct" });
    }

    // Creating token
    const token = jwt.sign(
      { userId: user._id, username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    // Sending response
    res.status(200).json({
      msg: "successfully signed in, redirecting....",
      user: user._id,
      token,
    });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ msg: "success", rowCount: users.length, users });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });
    if (!user)
      return res.status(404).json({ msg: `No user was found with id: ${id}` });

    res.status(200).json({ msg: "success", user });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const updatePic = async (req, res) => {
  try {
    const { img } = req.body;
    const { userId } = req.user;

    const user = await User.findByIdAndUpdate(
      userId,
      { pic: img },
      { new: true, runValidators: true }
    );
    res.status(200).json({ msg: "Profile avatar updated", user });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const editUser = async (req, res) => {
  try {
    const {
      params: { id },
      body: { fullname, username },
    } = req;

    if (!fullname || !username)
      return res
        .status(500)
        .json({ msg: "Make sure you're inputing the right fields" });

    const user = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!user)
      return res.status(404).json({ msg: `No user was found with id: ${id}` });

    res.status(200).json({ msg: "updated", user });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const delUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user)
      return res.status(404).json({ msg: `No user was found with id: ${id}` });

    res.status(200).json({ msg: "deleted", deletedUser: id });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

const updatePassword = async (req, res) => {
  try {
    const {
      user: { userId },
      body: { oldPass, newPass, confirmPass },
    } = req;

    if (!oldPass || !newPass || !confirmPass)
      return res.status(500).json({ msg: "Fill in required fields" });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ msg: `No user was found with id: ${id}` });

    const verifyOldPass = await bcrypt.compare(oldPass, user.password);

    if (!verifyOldPass)
      return res.status(500).json({ msg: "Old password is not correct" });

    if (newPass !== confirmPass)
      return res.status(500).json({ msg: "Passwords do not match" });

    const salt = await bcrypt.genSalt(10);
    const newHashedPass = await bcrypt.hash(newPass, salt);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: newHashedPass },
      { new: true, runValidators: true }
    );

    res.status(200).json({ msg: "success", updatedUser: updatedUser._id });
  } catch (err) {
    res.status(500).json({ msg: "An error occured", err });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUser,
  updatePic,
  editUser,
  delUser,
  updatePassword,
};
