const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
const loginLimiter =
  require("../middlewares/loginLimiter");

router.post(
  "/login",
  loginLimiter,
  login
);

module.exports = router;