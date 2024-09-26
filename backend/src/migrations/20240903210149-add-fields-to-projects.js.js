"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Projects", "imageUrl", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Projects", "tags", {
      type: Sequelize.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("tags");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("tags", JSON.stringify(value));
      },
    });

    await queryInterface.addColumn("Projects", "featured", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });

    await queryInterface.addColumn("Projects", "manager", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "managerPubKey",

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Projects", "imageUrl");
    await queryInterface.removeColumn("Projects", "tags");
    await queryInterface.removeColumn("Projects", "featured");
    await queryInterface.removeColumn("Projects", "manager");
  },
};