// /solana-crowdfunding-platform/backend/src/controllers/reviewController.js

const { Review, Project, User, RecentActivity } = require("../models");

class ReviewController {
  // Get all reviews for a project
  async getReviewsByProjectId(req, res) {
    try {
      const projectId = req.params.projectId;
      const reviews = await Review.findAll({
        where: { projectId },
        include: [
          { model: Project, as: "project" },
          { model: User, as: "user" },
        ],
      });
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Create a new review for a project
  async submitReview(req, res) {
    try {
      const { projectId, userId, rating, comment } = req.body;
      const review = await Review.create({
        projectId,
        userId,
        rating,
        comment,
      });

      // Create recent activity
      await RecentActivity.create({
        message: `New review submitted by user: ${userId}`,
        icon: "⭐",
        action: "new_review",
      });

      res.status(201).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new ReviewController();