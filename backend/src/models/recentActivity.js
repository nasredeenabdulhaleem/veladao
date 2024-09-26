// backend/src/models/recentActivity.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


module.exports = (sequelize) => {
    const RecentActivity = sequelize.define(
        "RecentActivity",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            icon: {
                type: DataTypes.ENUM("👤", "🌊", "💰", "🏆", "⭐"),
                allowNull: false,
            },
            action: {
                type: DataTypes.ENUM("new_user", "new_project", "new_donation", "new_milestone", "new_review"),
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );

    return RecentActivity;
};