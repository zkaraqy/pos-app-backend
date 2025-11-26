'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transaction_details', [
      // Transaction 1: Ahmad Rizki - Makan ditempat
      {
        id: 1,
        id_transaction: 1,
        id_product: 1, // Nasi Goreng
        id_product_varian: null,
        price: 25000.00,
        quantity: 2,
      },
      {
        id: 2,
        id_transaction: 1,
        id_product: 5, // Es Teh Manis
        id_product_varian: null,
        price: 5000.00,
        quantity: 2,
      },
      {
        id: 3,
        id_transaction: 1,
        id_product: null,
        id_product_varian: 2, // Kopi Hitam Medium
        price: 12000.00,
        quantity: 1,
      },

      // Transaction 2: Dewi Lestari - Bawa pulang
      {
        id: 4,
        id_transaction: 2,
        id_product: 3, // Ayam Bakar
        id_product_varian: null,
        price: 30000.00,
        quantity: 1,
      },
      {
        id: 5,
        id_transaction: 2,
        id_product: 6, // Es Jeruk
        id_product_varian: null,
        price: 8000.00,
        quantity: 1,
      },

      // Transaction 3: Andi Wijaya - Waiting payment
      {
        id: 6,
        id_transaction: 3,
        id_product: 4, // Soto Ayam
        id_product_varian: null,
        price: 20000.00,
        quantity: 3,
      },
      {
        id: 7,
        id_transaction: 3,
        id_product: 5, // Es Teh Manis
        id_product_varian: null,
        price: 5000.00,
        quantity: 3,
      },

      // Transaction 4: Rina Susanti - Completed
      {
        id: 8,
        id_transaction: 4,
        id_product: 9, // Pisang Goreng
        id_product_varian: null,
        price: 10000.00,
        quantity: 2,
      },
      {
        id: 9,
        id_transaction: 4,
        id_product: 10, // Brownie
        id_product_varian: null,
        price: 18000.00,
        quantity: 1,
      },
      {
        id: 10,
        id_transaction: 4,
        id_product: null,
        id_product_varian: 1, // Kopi Hitam Small
        price: 8000.00,
        quantity: 2,
      },

      // Transaction 5: Canceled (no need for details or just empty)
      {
        id: 11,
        id_transaction: 5,
        id_product: 2, // Mie Goreng
        id_product_varian: null,
        price: 22000.00,
        quantity: 1,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transaction_details', null, {});
  },
};
