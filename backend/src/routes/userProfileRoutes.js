const express = require("express");
const router = express.Router();

const UserProfileController = require("../controllers/userProfileController");


// UserProfile routes
router.post("/", UserProfileController.upsertUserProfile);
router.put("/", UserProfileController.upsertUserProfile);
router.get("/:userId", UserProfileController.getUserProfileByUserId);

module.exports = router;