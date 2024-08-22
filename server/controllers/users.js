const User = require("../models/users");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, fullname, phone, password } = req.body;

    if (!username || !fullname || !phone || !password)
      res.status(501).json({ msg: "username or email wrong" });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const tempUser = { username, fullname, phone, password: hashedPass };
    const user = await User.create({ ...tempUser });

    const token = jwt.sign(
      { userId: user._id, username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    res.status(200).json({ user: user._id, token });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { register, login };
