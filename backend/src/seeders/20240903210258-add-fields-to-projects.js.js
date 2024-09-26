"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Projects", [
      {
        title: "Project A",
        description: "Description for Project A",
        fundingGoal: 1000.0,
        currentFunding: 100.0,
        status: "active",
        imageUrl: "https://via.placeholder.com/120",
        tags: JSON.stringify(["tech", "innovation"]),
        featured: true,
        manager: "test",
        ownerId: 1,
        endDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Project B",
        description: "Description for Project B",
        fundingGoal: 2000.0,
        currentFunding: 500.0,
        status: "pending",
        imageUrl: "https://via.placeholder.com/120",
        tags: JSON.stringify(["health", "wellness"]),
        featured: false,
        manager: "test",
        ownerId: 2,
        endDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Projects", null, {});
  },
};