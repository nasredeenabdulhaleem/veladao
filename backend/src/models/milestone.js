// backend/src/models/milestone.js

module.exports = (sequelize, DataTypes) => {
    const Milestone = sequelize.define(
        "Milestone",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            dueDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            projectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Projects",
                    key: "id",
                },
            },
            status: {
                type: DataTypes.ENUM("pending", "completed"),
                defaultValue: "pending",
            },
        },
        {
            timestamps: true,
        }
    );

    Milestone.associate = (models) => {
        Milestone.belongsTo(models.Project, {
            foreignKey: "projectId",
            as: "project",
        });
    };

    return Milestone;
};