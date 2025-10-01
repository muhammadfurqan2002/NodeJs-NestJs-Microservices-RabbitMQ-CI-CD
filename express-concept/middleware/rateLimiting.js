const { rateLimit } = require("express-rate-limit");

const createBasicRateLimiter = (maxRequests, time) => {
  return rateLimit({
    windowMs: time,
    limit: maxRequests,   // ✅ use "limit", not "max"
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
  });
};

module.exports = { createBasicRateLimiter };
