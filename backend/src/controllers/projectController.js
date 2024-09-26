// backend/src/controllers/projectController.js

const { Project, Milestone, Contribution, Review, User, RecentActivity } = require("../models");
const { BN } = require('@project-serum/anchor');
const SolanaService = require('../services/solanaService')

const managerSecretKey = require('../secret-key.json')
const solanaService = new SolanaService('https://api.devnet.solana.com', managerSecretKey);


class ProjectController {
  constructor() {
    this.solanaService = new SolanaService('https://api.devnet.solana.com', managerSecretKey);//new SolanaService(config.solanaRpcUrl, config.managerSecretKey);
  }
  async createProject(req, res) {
    try {
      const { title, description, fundingGoal, endDate, milestones, imageUrl, tags, featured, manager } = req.body;

      const smartMilestone = milestones.map(m => ({
        description: m.description,
        dueDate: new BN(new Date(m.dueDate).getTime() / 1000)
      }))
      console.log("milestones", smartMilestone)
      // Ensure platform is initialized
      if (!solanaService.platformPubkey) {
        await solanaService.initializePlatform();
      }

      const projectId = await solanaService.initializeProject(title, description, fundingGoal, smartMilestone.map(m => m.dueDate), endDate);
      console.log("Project initialized with ID:", projectId);


      // Create a new project
      const project = await Project.create({
        title,
        description,
        fundingGoal,
        endDate,
        imageUrl,
        tags,
        featured,
        manager,
        ownerId: req.user.id, // Assuming user authentication middleware is implemented
      });

      // Create milestones if provided
      if (milestones && milestones.length > 0) {
        for (const milestone of milestones) {
          await Milestone.create({
            ...milestone,
            projectId: project.id,
          });
        }
      }

      // Create recent activity
      await RecentActivity.create({
        message: `New project created: ${title}`,
        icon: "🌊",
        action: "new_project",
      });


      res.status(201).json({ project });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create project" });
    }
  }

  async getProjects(req, res) {
    try {
      // Retrieve all projects with related models
      const projects = await Project.findAll({
        include: [
          { model: Milestone, as: "milestones" },
          { model: Contribution, as: "contributions" },
          { model: Review, as: "reviews" },
          { model: User, as: "owner" },
        ],
      });

      res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get projects" });
    }
  }

  async getProjectsByOwner(req, res) {
    try {
      const { ownerId } = req.params;
      const projects = await Project.findAll({
        where: { ownerId },
        include: [
          { model: Milestone, as: "milestones" },
          { model: Contribution, as: "contributions" },
          { model: Review, as: "reviews" },
          { model: User, as: "owner" },
        ],
      });

      res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get projects" });
    }
  }

  async getProjectDetails(req, res) {
    try {
      const { projectId } = req.params;

      // Retrieve project details by ID with related models
      const project = await Project.findByPk(projectId, {
        include: [
          { model: Milestone, as: "milestones" },
          { model: Contribution, as: "contributions" },
          { model: Review, as: "reviews" },
          { model: User, as: "owner" },
        ],
      });

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get project details" });
    }
  }

  async updateProject(req, res) {
    try {
      const { projectId } = req.params;
      const { title, description, fundingGoal, endDate, milestones, status, imageUrl, tags, featured, manager } = req.body;

      // Find project by ID
      const project = await Project.findByPk(projectId);

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // Update project details
      project.title = title || project.title;
      project.description = description || project.description;
      project.fundingGoal = fundingGoal || project.fundingGoal;
      project.endDate = endDate || project.endDate;
      project.status = status || project.status;
      project.imageUrl = imageUrl || project.imageUrl;
      project.tags = tags || project.tags;
      project.featured = featured !== undefined ? featured : project.featured;
      project.manager = manager || project.manager;

      await project.save();

      // Update milestones if provided
      if (milestones && milestones.length > 0) {
        await Milestone.destroy({ where: { projectId: project.id } });
        for (const milestone of milestones) {
          await Milestone.create({
            ...milestone,
            projectId: project.id,
          });
        }
      }

      const updatedProject = await Project.findByPk(projectId, {
        include: [
          { model: Milestone, as: "milestones" },
          { model: Contribution, as: "contributions" },
          { model: Review, as: "reviews" },
          { model: User, as: "owner" },
        ],
      });

      res.status(200).json({ project: updatedProject });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update project" });
    }
  }

  async deleteProject(req, res) {
    try {
      const { projectId } = req.params;

      // Find project by ID
      const project = await Project.findByPk(projectId);

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // Delete project
      await project.destroy();

      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  }
}

module.exports = new ProjectController();