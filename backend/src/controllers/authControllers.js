require("dotenv").config();
const userModel = require("../models/Users");
const tokenBlacklistModel = require("../models/BlacklistToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid username, email and password",
      });
    }

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Account already exists with this email address or username",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" },
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);
    res.status(201).json({
      success: true,
      message: "User created succesfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error, "Error while registering user");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid username, email and password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid user details provided",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid user details provided",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error, "Error while logging in user");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    };

    if (token) {
      await tokenBlacklistModel.create({ token });
    }

    res.clearCookie("token", cookieOptions);

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error, "Error while registering user");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const userDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched succesfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error, "Error while registering user");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  userDetails,
};
