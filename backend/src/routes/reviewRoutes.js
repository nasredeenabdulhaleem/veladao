// /solana-crowdfunding-platform/backend/src/routes/reviewRoutes.js

const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

// Route for submitting a review
router.post(
  "/reviews",
  authMiddleware.authenticateUser,
  reviewController.submitReview
);

// Route for retrieving reviews for a project
router.get(
  "/projects/:projectId/reviews",
  reviewController.getReviewsByProjectId
);

module.exports = router;
