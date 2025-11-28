'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transaction_details', [
      // === Transaksi 1: Keluarga Pak Budi (makan di tempat) ===
      // 2 Nasi Goreng Spesial, 1 Ayam Bakar Madu, 1 Soto Ayam, 4 Es Teh Manis
      { id: 1, id_transaction: 1, id_product: 1, id_product_varian: null, price: 28000.00, quantity: 2 },
      { id: 2, id_transaction: 1, id_product: 8, id_product_varian: null, price: 35000.00, quantity: 1 },
      { id: 3, id_transaction: 1, id_product: 15, id_product_varian: null, price: 25000.00, quantity: 1 },
      { id: 4, id_transaction: 1, id_product: 23, id_product_varian: null, price: 6000.00, quantity: 4 },

      // === Transaksi 2: Andi (bawa pulang - kopi) ===
      // 2 Kopi Susu Iced Medium, 1 Brownies Topping Keju
      { id: 5, id_transaction: 2, id_product: null, id_product_varian: 12, price: 22000.00, quantity: 2 },
      { id: 6, id_transaction: 2, id_product: null, id_product_varian: 22, price: 22000.00, quantity: 1 },

      // === Transaksi 3: Tim Marketing ABC (makan siang kantor) ===
      // 3 Ayam Geprek Level 2, 2 Mie Ayam Bakso Komplit, 5 Es Teh Manis, 2 Es Jeruk
      { id: 7, id_transaction: 3, id_product: null, id_product_varian: 2, price: 28000.00, quantity: 3 },
      { id: 8, id_transaction: 3, id_product: null, id_product_varian: 21, price: 42000.00, quantity: 2 },
      { id: 9, id_transaction: 3, id_product: 23, id_product_varian: null, price: 6000.00, quantity: 5 },
      { id: 10, id_transaction: 3, id_product: 24, id_product_varian: null, price: 10000.00, quantity: 2 },

      // === Transaksi 4: Sari & Dewi (dessert dan minuman) ===
      // 2 Es Campur, 1 Pudding Coklat, 1 Es Krim Mix, 2 Cappuccino Iced
      { id: 11, id_transaction: 4, id_product: 26, id_product_varian: null, price: 18000.00, quantity: 2 },
      { id: 12, id_transaction: 4, id_product: 39, id_product_varian: null, price: 12000.00, quantity: 1 },
      { id: 13, id_transaction: 4, id_product: null, id_product_varian: 28, price: 28000.00, quantity: 1 },
      { id: 14, id_transaction: 4, id_product: null, id_product_varian: 15, price: 25000.00, quantity: 2 },

      // === Transaksi 5: Rudi (waiting payment) ===
      // 1 Bebek Goreng Sambal Ijo, 1 Nasi Putih, 1 Es Kelapa Muda
      { id: 15, id_transaction: 5, id_product: 11, id_product_varian: null, price: 42000.00, quantity: 1 },
      { id: 16, id_transaction: 5, id_product: 6, id_product_varian: null, price: 5000.00, quantity: 1 },
      { id: 17, id_transaction: 5, id_product: 25, id_product_varian: null, price: 15000.00, quantity: 1 },

      // === Transaksi 6: Canceled ===
      // 1 Nasi Goreng Seafood
      { id: 18, id_transaction: 6, id_product: 2, id_product_varian: null, price: 35000.00, quantity: 1 },

      // === Transaksi 7: Gojek - Ratna (paket hemat) ===
      // 2 Paket Nasi Ayam Geprek
      { id: 19, id_transaction: 7, id_product: 43, id_product_varian: null, price: 32000.00, quantity: 2 },

      // === Transaksi 8: Pak Hendra (seafood order) ===
      // 1 Udang Saus Padang, 1 Cumi Goreng Tepung, 2 Nasi Putih, 2 Es Jeruk, 1 Teh Hangat Tawar
      { id: 20, id_transaction: 8, id_product: 12, id_product_varian: null, price: 55000.00, quantity: 1 },
      { id: 21, id_transaction: 8, id_product: 13, id_product_varian: null, price: 45000.00, quantity: 1 },
      { id: 22, id_transaction: 8, id_product: 6, id_product_varian: null, price: 5000.00, quantity: 2 },
      { id: 23, id_transaction: 8, id_product: 24, id_product_varian: null, price: 10000.00, quantity: 2 },
      { id: 24, id_transaction: 8, id_product: null, id_product_varian: 30, price: 4000.00, quantity: 1 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transaction_details', null, {});
  },
};
