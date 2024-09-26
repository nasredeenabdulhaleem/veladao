const express = require("express");
const MilestoneController = require("../controllers/milestoneController");

const router = express.Router();


// Milestone routes
router.post("/milestones", MilestoneController.createMilestone);
router.get("/milestones/project/:projectId", MilestoneController.getMilestonesByProjectId);
router.put("/milestones/:milestoneId", MilestoneController.updateMilestone);
router.delete("/milestones/:milestoneId", MilestoneController.deleteMilestone);

module.exports = router;