const User = require("../models/users");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    res.status(200).json({ msg: "Success" });
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
