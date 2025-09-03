const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Autherization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({
      message: "No token, authroization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    res.status(401).json({
      message: "Token is not valid",
    });
  }
};

module.exports = authMiddleware;
