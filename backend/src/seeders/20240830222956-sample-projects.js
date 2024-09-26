'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Projects', [
      {
        title: 'Project Alpha',
        description: 'Description for Project Alpha',
        fundingGoal: 10000,
        currentFunding: 5000,
        status: 'active',
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)), // 30 days from now
        ownerId: 1, // Assuming the owner with ID 1 exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Project Beta',
        description: 'Description for Project Beta',
        fundingGoal: 20000,
        currentFunding: 15000,
        status: 'active',
        endDate: new Date(new Date().setDate(new Date().getDate() + 60)), // 60 days from now
        ownerId: 1, // Assuming the owner with ID 1 exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Project Gamma',
        description: 'Description for Project Gamma',
        fundingGoal: 15000,
        currentFunding: 7000,
        status: 'pending',
        endDate: new Date(new Date().setDate(new Date().getDate() + 45)), // 45 days from now
        ownerId: 1, // Assuming the owner with ID 1 exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Project Delta',
        description: 'Description for Project Delta',
        fundingGoal: 5000,
        currentFunding: 3000,
        status: 'completed',
        endDate: new Date(new Date().setDate(new Date().getDate() + 15)), // 15 days from now
        ownerId: 1, // Assuming the owner with ID 1 exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Project Epsilon',
        description: 'Description for Project Epsilon',
        fundingGoal: 25000,
        currentFunding: 10000,
        status: 'active',
        endDate: new Date(new Date().setDate(new Date().getDate() + 90)), // 90 days from now
        ownerId: 1, // Assuming the owner with ID 1 exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Projects', null, {});
  }
};