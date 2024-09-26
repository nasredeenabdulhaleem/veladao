// backend/src/routes/authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validationMiddleware = require("../middlewares/validationMiddleware");

// Route for user registration
router.post(
  "/register",
  validationMiddleware.validateRegistrationInputs,
  authController.registerUser
);

// Route for user login
router.post(
  "/login",
  validationMiddleware.validateLogin,
  authController.loginUser
);

module.exports = router;
