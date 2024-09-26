'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed UserProfiles
    await queryInterface.bulkInsert('UserProfiles', [
      {
        userId: 1,
        bio: 'This is the bio of the first user.',
        avatarUrl: 'https://example.com/avatar1.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // Verify Projects table
    const projects = await queryInterface.sequelize.query(
      `SELECT id FROM Projects WHERE id IN (6, 7);`
    );

    if (projects[0].length === 0) {
      throw new Error('Required projects not found in the Projects table.');
    }


    // Seed Contributions
    await queryInterface.bulkInsert('Contributions', [
      {
        projectId: 6, // Assuming Project Alpha
        ref: 'CONTRIB001',
        donor: 1,
        amount: 100.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectId: 7, // Assuming Project Beta
        ref: 'CONTRIB002',
        donor: 1,
        amount: 200.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // Seed Milestones
    await queryInterface.bulkInsert('Milestones', [
      {
        projectId: 6, // Assuming Project Alpha
        description: 'Milestone 1 for Project Alpha',
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectId: 7, // Assuming Project Beta
        description: 'Milestone 1 for Project Beta',
        dueDate: new Date(new Date().setDate(new Date().getDate() + 60)),
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // Seed Reviews
    await queryInterface.bulkInsert('Reviews', [
      {
        projectId: 6, // Assuming Project Alpha
        userId: 1,
        rating: 5,
        comment: 'Excellent project!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectId: 7, // Assuming Project Beta
        userId: 1,
        rating: 4,
        comment: 'Very good project!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserProfiles', null, {});
    await queryInterface.bulkDelete('Contributions', null, {});
    await queryInterface.bulkDelete('Milestones', null, {});
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};

