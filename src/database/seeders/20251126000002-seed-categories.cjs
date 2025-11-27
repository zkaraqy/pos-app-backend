'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { id: 1, name: 'Makanan', created_at: new Date(), updated_at: new Date() },
      { id: 2, name: 'Minuman', created_at: new Date(), updated_at: new Date() },
      { id: 3, name: 'Snack', created_at: new Date(), updated_at: new Date() },
      { id: 4, name: 'Kue', created_at: new Date(), updated_at: new Date() },
      { id: 5, name: 'Paket', created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
