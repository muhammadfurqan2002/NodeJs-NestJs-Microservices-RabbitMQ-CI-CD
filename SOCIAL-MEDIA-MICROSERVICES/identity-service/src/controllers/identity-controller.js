const logger = require("../utils/logger");
const User = require("../models/user");
const { validatingRegistration } = require("../utils/validation");
const generateToken = require("../utils/generateToken");

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




module.exports = { registerUser };