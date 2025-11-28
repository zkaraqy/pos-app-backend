'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { id: 1, name: 'Nasi & Mie', created_at: new Date(), updated_at: new Date() },
      { id: 2, name: 'Ayam & Bebek', created_at: new Date(), updated_at: new Date() },
      { id: 3, name: 'Seafood', created_at: new Date(), updated_at: new Date() },
      { id: 4, name: 'Sop & Soto', created_at: new Date(), updated_at: new Date() },
      { id: 5, name: 'Gorengan', created_at: new Date(), updated_at: new Date() },
      { id: 6, name: 'Minuman Dingin', created_at: new Date(), updated_at: new Date() },
      { id: 7, name: 'Minuman Panas', created_at: new Date(), updated_at: new Date() },
      { id: 8, name: 'Kopi', created_at: new Date(), updated_at: new Date() },
      { id: 9, name: 'Jus & Smoothie', created_at: new Date(), updated_at: new Date() },
      { id: 10, name: 'Dessert', created_at: new Date(), updated_at: new Date() },
      { id: 11, name: 'Paket Hemat', created_at: new Date(), updated_at: new Date() },
      { id: 12, name: 'Best Seller', created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
