const logger = require("../utils/logger");
const User = require("../models/user");
const { validatingRegistration, validatingLogin } = require("../utils/validation");
const generateToken = require("../utils/generateToken");
const RefreshToken = require("../models/resfreshToken");

const registerUser = async (req, res) => {
  logger.info("Registering a new user");
  try {
    const { error } = validatingRegistration(req.body);
    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      logger.warn("User already exists", existingUser);
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const user = new User({ email, username, password });
    await user.save();
    logger.warn("User registered successfully", user._id);
    const { accessToken, refreshToken } = await generateToken(user);
    res.status(201).json({
      success: true, message: "User registered successfully",
      data: { userId: user._id, username: user.username, accessToken, refreshToken }
    });

  } catch (error) {
    logger.error("Error registering user", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }

};




const loginUser = async (req, res) => {
  logger.info("Login Endpoint hit...");
  try {
    const { error } = validatingLogin(req.body);
    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      logger.warn("Invalid user");
      res.status(400).json({ success: false, message: "Invalid Credentials" })
    }
    const isValidPassword = await userExist.comparePassword(password);
    if (!isValidPassword) {
      logger.warn("Invalid Password");
      res.status(400).json({ success: false, message: "Invalid Password" })
    }
    const { accessToken, refreshToken } = await generateToken(userExist);
    res.json({
      refreshToken,
      accessToken,
      userId: userExist._id
    });
  }
  catch (error) {
    logger.error("Error registering user", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


const userRefreshToken = async (req, res) => {
  logger.warn("Refresh Token endpoint hit...");
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      logger.error("Refresh Token error is missing");
      res.status(400).json({ success: false, message: "Refresh Token i missing" });

    }
    const storeToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storeToken || storeToken.expiresAt < new Date()) {
      logger.warn("Inavlid or Expire Refresh token");
      res.status(400).json({ success: false, message: "Invalid or Expire refresh token" });
    }
    const user = await User.findById(storeToken.user);
    if (!user) {
      logger.error("User not found");
      res.status(401).json({ success: false, message: "User not found" });
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateToken(user);
    await RefreshToken.deleteOne({ _id: storeToken._id });

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    })


  } catch (error) {
    logger.error("Refresh Token error occured", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const logoutUser = async (req, res) => {
  logger.info("Logout end point hit...");
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      logger.error("Refresh Token error is missing");
      res.status(400).json({ success: false, message: "Refresh Token i missing" });
    }
    await RefreshToken.deleteOne({ token: refreshToken });
    logger.info("Refresh Token deleted for logout");
    res.json({
      success: true,
      message: "Logged out successfully"
    })
  } catch (e) {
    logger.warn("Error appear while logging out", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports = { registerUser, loginUser, userRefreshToken,logoutUser };