'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `UPDATE products SET is_active = true WHERE is_active IS NULL`
    );

    await queryInterface.sequelize.query(
      `UPDATE transactions SET transaction_status = 'waiting' WHERE transaction_status IS NULL`
    );
  },

  down: async (queryInterface, Sequelize) => {
  },
};
