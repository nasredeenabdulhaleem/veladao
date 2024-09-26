const { UserProfile, User, RecentActivity } = require("../models");

class UserProfileController {
    // Create or update user profile
    async upsertUserProfile(req, res) {
        try {
            const { userId, bio, avatarUrl } = req.body;

            // Check if user exists
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Create or update user profile
            const [userProfile, created] = await UserProfile.upsert({
                userId,
                bio,
                avatarUrl,
            });

            // Create recent activity
            await RecentActivity.create({
                message: created ? `New profile created for user: ${user.username}` : `Profile updated for user: ${user.username}`,
                icon: "👤",
                action: created ? "new_user" : "profile_update",
            });


            res.status(200).json({ message: created ? "Profile created successfully" : "Profile updated successfully", userProfile });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }

    // Get user profile by user ID
    async getUserProfileByUserId(req, res) {
        try {
            const { userId } = req.params;

            // Retrieve user profile
            const userProfile = await UserProfile.findOne({
                where: { userId },
                include: [{ model: User, as: "user" }],
            });

            if (!userProfile) {
                return res.status(404).json({ message: "Profile not found" });
            }

            res.status(200).json(userProfile);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
}

module.exports = new UserProfileController();