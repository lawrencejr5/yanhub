const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    if (!authorization || !authorization.startsWith("Bearer "))
      return res.status(500).json({ msg: "Authentication failed" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { ...payload };
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = auth;
