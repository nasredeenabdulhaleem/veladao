const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Contribution = sequelize.define("Contribution", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    ref: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    donor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  Contribution.associate = (models) => {
    Contribution.belongsTo(models.Project, {
      foreignKey: "projectId",
      as: "project",
    });

  };

  return Contribution;
};
