'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Settings', [
      {
        key: 'maintenance_mode',
        value: 'false',
        category: 'system',
        description: 'Toggle for maintenance mode on the platform',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'blockchain_mode',
        value: 'mainnet',
        category: 'blockchain',
        description: 'Blockchain mode, can be mainnet, testnet, devnet, or localnet',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'blockchain_mode_url',
        value: 'https://api.mainnet-beta.solana.com',
        category: 'blockchain',
        description: 'Blockchain network URL based on selected mode',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'site_title',
        value: 'Crowdfunding Platform',
        category: 'general',
        description: 'Title of the site',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'support_email',
        value: 'support@platform.com',
        category: 'general',
        description: 'Support email for user queries',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Settings', null, {});
  },
};
