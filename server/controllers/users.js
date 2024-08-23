const User = require("../models/users");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, fullname, phone, password } = req.body;

    // Check required fields
    if (!username || !fullname || !password)
      return res.status(501).json({ msg: "Fill in required fields" });

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
    res.status(200).json({ user: user._id, token });
  } catch (err) {
    console.log(err);
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
    res
      .status(200)
      .json({ msg: "Successfully signed in", user: user._id, token });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { register, login };
