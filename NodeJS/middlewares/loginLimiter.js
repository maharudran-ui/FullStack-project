const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 300, 

  max: 5,

  message: {
    message:
      "Too many login attempts. Please try again after 5 minutes."
  },

  standardHeaders: true,
  legacyHeaders: false
});

module.exports = loginLimiter;