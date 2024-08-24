const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  // checking for authorization in headers
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(500).json({ msg: "Authentication failed" });

  try {
    //   getting the token
    const token = authHeader.split(" ")[1];
    // verifying token and passing to user
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { ...payload };
    //   passing to next middleware
    next();
  } catch (err) {
    return res.status(500).json({ msg: "An error occured" });
  }
};

module.exports = auth;
