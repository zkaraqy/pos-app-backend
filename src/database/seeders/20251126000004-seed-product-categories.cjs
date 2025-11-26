'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_category', [
      // Nasi Goreng - Makanan
      { id: 1, id_product: 1, id_category: 1 },
      // Mie Goreng - Makanan
      { id: 2, id_product: 2, id_category: 1 },
      // Ayam Bakar - Makanan
      { id: 3, id_product: 3, id_category: 1 },
      // Soto Ayam - Makanan
      { id: 4, id_product: 4, id_category: 1 },
      // Es Teh Manis - Minuman
      { id: 5, id_product: 5, id_category: 2 },
      // Es Jeruk - Minuman
      { id: 6, id_product: 6, id_category: 2 },
      // Kopi Hitam - Minuman
      { id: 7, id_product: 7, id_category: 2 },
      // Keripik Singkong - Snack
      { id: 8, id_product: 8, id_category: 3 },
      // Pisang Goreng - Snack & Kue
      { id: 9, id_product: 9, id_category: 3 },
      { id: 10, id_product: 9, id_category: 4 },
      // Brownie - Kue
      { id: 11, id_product: 10, id_category: 4 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_category', null, {});
  },
};
