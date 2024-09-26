"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Contributions", [
      {
        projectId: 7,
        ref: "REF123",
        donor: "John Doe",
        amount: 100.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectId: 6,
        ref: "REF456",
        donor: "Jane Smith",
        amount: 200.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Contributions", null, {});
  },
};