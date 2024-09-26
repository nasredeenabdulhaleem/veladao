// backend/src/controllers/dashboardController.js

const { User, Project, Contribution, RecentActivity } = require('../models');

const getDashboardMetrics = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalProjects = await Project.count();
        const totalAmountRaised = await Contribution.sum('amount');
        const totalDonations = await Contribution.count();
        const recentActivities = await RecentActivity.findAll({
            limit: 10,
            order: [['createdAt', 'DESC']],
        });

        // Mock data for funding trends
        const fundingTrends = [
            { name: "January", amount: 40000 },
            { name: "February", amount: 35000 },
            { name: "March", amount: 45000 },
        ];

        res.status(200).json({
            totalUsers,
            totalProjects,
            totalAmountRaised,
            totalDonations,
            recentActivities: recentActivities.map(activity => ({
                message: activity.message,
                icon: activity.icon,
            })),
            fundingTrends,
        });
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDashboardMetrics,
};