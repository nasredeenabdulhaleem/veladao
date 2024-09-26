// File: /solana-crowdfunding-platform/backend/src/middlewares/validationMiddleware.js

const { body, validationResult } = require("express-validator");


// Function to validate user registration inputs
exports.validateRegistrationInputs = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Function to validate project creation inputs
exports.validateProjectCreationInputs = [
  body("projectName")
    .isLength({ min: 3 })
    .withMessage("Project name must be at least 3 characters long"),
  body("description")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
  body("fundingGoal")
    .isFloat({ min: 1 })
    .withMessage("Funding goal must be a positive number"),
  body("password")
    .if(body("password").exists())
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Function to validate contribution inputs
exports.validateContributionInputs = [
  body("amount")
    .isFloat({ min: 1 })
    .withMessage("Contribution amount must be a positive number"),
  body("projectId").isUUID().withMessage("Project ID must be a valid UUID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Function to validate review inputs
exports.validateReviewInputs = [
  body("reviewText")
    .isLength({ min: 10 })
    .withMessage("Review text must be at least 10 characters long"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("projectId").isUUID().withMessage("Project ID must be a valid UUID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Function to validate user login inputs
exports.validateLogin = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Other validation functions...
