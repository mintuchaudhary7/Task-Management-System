const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
