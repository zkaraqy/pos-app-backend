'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_categories', [
      // === NASI & MIE (Category 1) ===
      { id: 1, id_product: 1, id_category: 1 },   // Nasi Goreng Spesial
      { id: 2, id_product: 1, id_category: 12 },  // Nasi Goreng Spesial - Best Seller
      { id: 3, id_product: 2, id_category: 1 },   // Nasi Goreng Seafood
      { id: 4, id_product: 2, id_category: 3 },   // Nasi Goreng Seafood - Seafood
      { id: 5, id_product: 3, id_category: 1 },   // Mie Goreng Jawa
      { id: 6, id_product: 4, id_category: 1 },   // Mie Ayam Bakso
      { id: 7, id_product: 4, id_category: 12 },  // Mie Ayam Bakso - Best Seller
      { id: 8, id_product: 5, id_category: 1 },   // Kwetiau Goreng
      { id: 9, id_product: 6, id_category: 1 },   // Nasi Putih

      // === AYAM & BEBEK (Category 2) ===
      { id: 10, id_product: 7, id_category: 2 },  // Ayam Goreng Kremes
      { id: 11, id_product: 8, id_category: 2 },  // Ayam Bakar Madu
      { id: 12, id_product: 8, id_category: 12 }, // Ayam Bakar Madu - Best Seller
      { id: 13, id_product: 9, id_category: 2 },  // Ayam Geprek
      { id: 14, id_product: 9, id_category: 12 }, // Ayam Geprek - Best Seller
      { id: 15, id_product: 10, id_category: 2 }, // Ayam Penyet
      { id: 16, id_product: 11, id_category: 2 }, // Bebek Goreng Sambal Ijo

      // === SEAFOOD (Category 3) ===
      { id: 17, id_product: 12, id_category: 3 }, // Udang Saus Padang
      { id: 18, id_product: 13, id_category: 3 }, // Cumi Goreng Tepung
      { id: 19, id_product: 14, id_category: 3 }, // Ikan Gurame Asam Manis

      // === SOP & SOTO (Category 4) ===
      { id: 20, id_product: 15, id_category: 4 }, // Soto Ayam
      { id: 21, id_product: 15, id_category: 12 },// Soto Ayam - Best Seller
      { id: 22, id_product: 16, id_category: 4 }, // Sop Buntut
      { id: 23, id_product: 17, id_category: 4 }, // Sop Iga Sapi
      { id: 24, id_product: 18, id_category: 4 }, // Rawon

      // === GORENGAN (Category 5) ===
      { id: 25, id_product: 19, id_category: 5 }, // Tahu Crispy
      { id: 26, id_product: 20, id_category: 5 }, // Tempe Mendoan
      { id: 27, id_product: 21, id_category: 5 }, // Pisang Goreng Madu
      { id: 28, id_product: 21, id_category: 10 },// Pisang Goreng Madu - Dessert
      { id: 29, id_product: 22, id_category: 5 }, // Bakwan Sayur

      // === MINUMAN DINGIN (Category 6) ===
      { id: 30, id_product: 23, id_category: 6 }, // Es Teh Manis
      { id: 31, id_product: 24, id_category: 6 }, // Es Jeruk
      { id: 32, id_product: 25, id_category: 6 }, // Es Kelapa Muda
      { id: 33, id_product: 26, id_category: 6 }, // Es Campur
      { id: 34, id_product: 26, id_category: 10 },// Es Campur - Dessert
      { id: 35, id_product: 27, id_category: 6 }, // Es Cendol
      { id: 36, id_product: 27, id_category: 10 },// Es Cendol - Dessert

      // === MINUMAN PANAS (Category 7) ===
      { id: 37, id_product: 28, id_category: 7 }, // Teh Hangat
      { id: 38, id_product: 29, id_category: 7 }, // Wedang Jahe
      { id: 39, id_product: 30, id_category: 7 }, // Coklat Panas

      // === KOPI (Category 8) ===
      { id: 40, id_product: 31, id_category: 8 }, // Kopi Hitam
      { id: 41, id_product: 32, id_category: 8 }, // Kopi Susu
      { id: 42, id_product: 32, id_category: 12 },// Kopi Susu - Best Seller
      { id: 43, id_product: 33, id_category: 8 }, // Cappuccino
      { id: 44, id_product: 34, id_category: 8 }, // Americano

      // === JUS & SMOOTHIE (Category 9) ===
      { id: 45, id_product: 35, id_category: 9 }, // Jus Alpukat
      { id: 46, id_product: 36, id_category: 9 }, // Jus Mangga
      { id: 47, id_product: 37, id_category: 9 }, // Jus Strawberry
      { id: 48, id_product: 38, id_category: 9 }, // Green Smoothie

      // === DESSERT (Category 10) ===
      { id: 49, id_product: 39, id_category: 10 }, // Pudding Coklat
      { id: 50, id_product: 40, id_category: 10 }, // Brownies
      { id: 51, id_product: 41, id_category: 10 }, // Pisang Bakar
      { id: 52, id_product: 42, id_category: 10 }, // Es Krim

      // === PAKET HEMAT (Category 11) ===
      { id: 53, id_product: 43, id_category: 11 }, // Paket Nasi Ayam Geprek
      { id: 54, id_product: 44, id_category: 11 }, // Paket Nasi Goreng Komplit
      { id: 55, id_product: 45, id_category: 11 }, // Paket Makan Berdua
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_categories', null, {});
  },
};
