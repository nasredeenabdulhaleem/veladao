// /solana-crowdfunding-platform/backend/src/controllers/contributionController.js

const { Project, Contribution, User } = require("../models");
const SolanaService = require("../services/solanaService");

class ContributionController {
  async contribute(req, res) {
    try {
      const { projectId, amount } = req.body;

      // Check if project exists
      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // Create contribution
      const contribution = await Contribution.create({
        projectId,
        userId: req.user.id,
        amount,
      });

      // Process payment using Solana blockchain
      const solanaService = new SolanaService();
      const transactionId = await solanaService.processPayment(
        contribution.id,
        amount
      );

      // Update contribution with transaction ID
      await contribution.update({ transactionId });

      // Create recent activity
      await RecentActivity.create({
        message: `New donation made: $${amount}`,
        icon: "💰",
        action: "new_donation",
      });

      return res.status(201).json({ contribution, transactionId });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProjectContributions(req, res) {
    try {
      const { projectId } = req.params;

      // Check if project exists
      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // Retrieve contributions for the project with related user information
      const contributions = await Contribution.findAll({
        where: { projectId },
        include: [
          { model: Project, as: "project" },
        ],
      });

      return res.status(200).json({ contributions });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllContributions(req, res) {
    try {
      const contributions = await Contribution.findAll({
        include: [
          {
            model: Project,
            as: 'project',
            include: [
              {
                model: User,
                as: 'owner'
              }
            ]
          }
        ]
      });

      return res.status(200).json({ contributions });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

}

module.exports = new ContributionController();