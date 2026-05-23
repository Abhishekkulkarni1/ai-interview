require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/BlacklistToken");

const JWT_SECRET = process.env.JWT_SECRET;

const authorize = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found in the request",
      });
    }
    const isBlacklistedToken = await tokenBlacklistModel.findOne({ token });
    if (isBlacklistedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid hhe token",
      });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error, "Error while authorizing user");
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = { authorize };
