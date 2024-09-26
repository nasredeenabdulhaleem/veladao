// /solana-crowdfunding-platform/backend/src/routes/contributionRoutes.js

const express = require("express");
const router = express.Router();
const contributionController = require("../controllers/contributionController");
const authMiddleware = require("../middlewares/authMiddleware");

// Route for contributing funds to a project
router.post(
  "/projects/:projectId/contribute",
  authMiddleware.authenticateUser,
  contributionController.contribute
);

// Route for retrieving contributions for a project
router.get(
  "/projects/:projectId/contributions",
  contributionController.getProjectContributions
);

router.get(
  "/contributions",
  contributionController.getAllContributions
);

module.exports = router;
