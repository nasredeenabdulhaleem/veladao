const { Milestone, Project } = require("../models");

class MilestoneController {
    // Create a new milestone
    async createMilestone(req, res) {
        try {
            const { description, dueDate, projectId, status } = req.body;

            // Check if project exists
            const project = await Project.findByPk(projectId);
            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }

            // Create a new milestone
            const milestone = await Milestone.create({
                description,
                dueDate,
                projectId,
                status,
            });

            res.status(201).json({ message: "Milestone created successfully", milestone });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Get all milestones for a project
    async getMilestonesByProjectId(req, res) {
        try {
            const { projectId } = req.params;

            // Retrieve milestones for the project
            const milestones = await Milestone.findAll({
                where: { projectId },
                include: [{ model: Project, as: "project" }],
            });

            res.status(200).json(milestones);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Update a milestone
    async updateMilestone(req, res) {
        try {
            const { milestoneId } = req.params;
            const { description, dueDate, status } = req.body;

            // Find milestone by ID
            const milestone = await Milestone.findByPk(milestoneId);
            if (!milestone) {
                return res.status(404).json({ message: "Milestone not found" });
            }

            // Update milestone details
            milestone.description = description || milestone.description;
            milestone.dueDate = dueDate || milestone.dueDate;
            milestone.status = status || milestone.status;

            await milestone.save();

            res.status(200).json({ message: "Milestone updated successfully", milestone });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Delete a milestone
    async deleteMilestone(req, res) {
        try {
            const { milestoneId } = req.params;

            // Find milestone by ID
            const milestone = await Milestone.findByPk(milestoneId);
            if (!milestone) {
                return res.status(404).json({ message: "Milestone not found" });
            }

            // Delete milestone
            await milestone.destroy();

            res.status(200).json({ message: "Milestone deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
}

module.exports = new MilestoneController();