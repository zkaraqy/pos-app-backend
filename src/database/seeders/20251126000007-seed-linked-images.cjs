'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('linked_image', [
      // Link images to products
      { id: 1, id_product: 1, id_product_varian: null, id_image: 1 }, // Nasi Goreng
      { id: 2, id_product: 2, id_product_varian: null, id_image: 2 }, // Mie Goreng
      { id: 3, id_product: 3, id_product_varian: null, id_image: 3 }, // Ayam Bakar
      { id: 4, id_product: 4, id_product_varian: null, id_image: 4 }, // Soto Ayam
      { id: 5, id_product: 5, id_product_varian: null, id_image: 5 }, // Es Teh
      { id: 6, id_product: 7, id_product_varian: null, id_image: 6 }, // Kopi Hitam (product)
      
      // Link images to product variants
      { id: 7, id_product: null, id_product_varian: 1, id_image: 6 }, // Kopi Small
      { id: 8, id_product: null, id_product_varian: 2, id_image: 6 }, // Kopi Medium
      { id: 9, id_product: null, id_product_varian: 3, id_image: 6 }, // Kopi Large
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('linked_image', null, {});
  },
};
