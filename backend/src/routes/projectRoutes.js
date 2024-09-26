// backend/src/routes/projectRoutes.js

const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");

// Route for creating a new project
router.post(
  "/",
  authMiddleware.authenticateUser,
  projectController.createProject
);

// Route for getting a list of projects
router.get("/", projectController.getProjects);

// Route for getting project details
router.get("/:projectId", projectController.getProjectDetails);

// Route for getting projects by owner
router.get(
  "/owner/:ownerId",
  authMiddleware.authenticateUser,
  projectController.getProjectsByOwner
);

// Route for updating project details
router.put(
  "/:projectId",
  authMiddleware.authenticateUser,
  projectController.updateProject
);

// Route for deleting a project
router.delete(
  "/:projectId",
  authMiddleware.authenticateUser,
  projectController.deleteProject
);

module.exports = router;
