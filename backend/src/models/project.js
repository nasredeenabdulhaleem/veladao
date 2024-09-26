// backend/src/models/project.js

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fundingGoal: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currentFunding: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM("pending", "active", "completed"),
        defaultValue: "pending",
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tags: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      featured: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      manager: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
    }
  );

  Project.associate = (models) => {
    Project.hasMany(models.Milestone, {
      foreignKey: "projectId",
      as: "milestones",
    });
    Project.hasMany(models.Contribution, {
      foreignKey: "projectId",
      as: "contributions",
    });
    Project.hasMany(models.Review, {
      foreignKey: "projectId",
      as: "reviews",
    });
    Project.belongsTo(models.User, {
      foreignKey: "ownerId",
      as: "owner",
    });
  };

  return Project;
};
