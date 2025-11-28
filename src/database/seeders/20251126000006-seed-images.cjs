'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('images', [
      // === NASI & MIE ===
      // Product id: 1 - Nasi Goreng Spesial
      { id: 1, label: 'Nasi Goreng Spesial', image_link: 'public/images/nasi-goreng-spesial.jpg', id_product: 1, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 2 - Nasi Goreng Seafood
      { id: 2, label: 'Nasi Goreng Seafood', image_link: 'public/images/nasi-goreng-seafood.jpg', id_product: 2, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 3 - Mie Goreng Jawa
      { id: 3, label: 'Mie Goreng Jawa', image_link: 'public/images/mie-goreng-jawa.jpg', id_product: 3, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 4 - Mie Ayam Bakso
      { id: 4, label: 'Mie Ayam Bakso', image_link: 'public/images/mie-ayam-bakso.jpeg', id_product: 4, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 5 - Kwetiau Goreng
      { id: 5, label: 'Kwetiau Goreng', image_link: 'public/images/kwetiau-goreng.jpg', id_product: 5, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 6 - Nasi Putih
      { id: 6, label: 'Nasi Putih', image_link: 'public/images/nasi-putih.jpg', id_product: 6, id_product_varian: null, created_at: new Date(), updated_at: new Date() },

      // === AYAM & BEBEK ===
      // Product id: 7 - Ayam Goreng Kremes
      { id: 7, label: 'Ayam Goreng Kremes', image_link: 'public/images/ayam-goreng-kremes.jpeg', id_product: 7, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 8 - Ayam Bakar Madu
      { id: 8, label: 'Ayam Bakar Madu', image_link: 'public/images/ayam-bakar-madu.png', id_product: 8, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 9 - Ayam Geprek
      { id: 9, label: 'Ayam Geprek', image_link: 'public/images/ayam-geprek.jpg', id_product: 9, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 10 - Ayam Penyet
      { id: 10, label: 'Ayam Penyet', image_link: 'public/images/ayam-penyet.jpg', id_product: 10, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 11 - Bebek Goreng Sambal Ijo
      { id: 11, label: 'Bebek Goreng Sambal Ijo', image_link: 'public/images/bebek-goreng-sambal-ijo.jpeg', id_product: 11, id_product_varian: null, created_at: new Date(), updated_at: new Date() },

      // === SEAFOOD ===
      // Product id: 12 - Udang Saus Padang
      { id: 12, label: 'Udang Saus Padang', image_link: 'public/images/udang-saus-padang.jpg', id_product: 12, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 13 - Cumi Goreng Tepung
      { id: 13, label: 'Cumi Goreng Tepung', image_link: 'public/images/cumi-goreng-tepung.jpg', id_product: 13, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 14 - Ikan Gurame Asam Manis
      { id: 14, label: 'Ikan Gurame Asam Manis', image_link: 'public/images/ikan-gurame-asam-manis.jpg', id_product: 14, id_product_varian: null, created_at: new Date(), updated_at: new Date() },

      // === SOP & SOTO ===
      // Product id: 15 - Soto Ayam
      { id: 15, label: 'Soto Ayam', image_link: 'public/images/soto-ayam.jpg', id_product: 15, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 16 - Sop Buntut
      { id: 16, label: 'Sop Buntut', image_link: 'public/images/sop-buntut.jpg', id_product: 16, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 17 - Sop Iga Sapi
      { id: 17, label: 'Sop Iga Sapi', image_link: 'public/images/sop-iga-sapi.png', id_product: 17, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 18 - Rawon
      { id: 18, label: 'Rawon', image_link: 'public/images/rawon.jpg', id_product: 18, id_product_varian: null, created_at: new Date(), updated_at: new Date() },

      // === GORENGAN ===
      // Product id: 19 - Tahu Crispy
      { id: 19, label: 'Tahu Crispy', image_link: 'public/images/tahu-crispy.jpg', id_product: 19, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 20 - Tempe Mendoan
      { id: 20, label: 'Tempe Mendoan', image_link: 'public/images/tempe-mendoan.jpg', id_product: 20, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 21 - Pisang Goreng Madu
      { id: 21, label: 'Pisang Goreng Madu', image_link: 'public/images/pisang-goreng-madu.jpg', id_product: 21, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 22 - Bakwan Sayur
      { id: 22, label: 'Bakwan Sayur', image_link: 'public/images/bakwan-sayur.jpg', id_product: 22, id_product_varian: null, created_at: new Date(), updated_at: new Date() },

      // === MINUMAN DINGIN ===
      // Product id: 23 - Es Teh Manis
      { id: 23, label: 'Es Teh Manis', image_link: 'public/images/es-teh-manis.jpg', id_product: 23, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 24 - Es Jeruk
      { id: 24, label: 'Es Jeruk', image_link: 'public/images/es-jeruk.jpg', id_product: 24, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 25 - Es Kelapa Muda
      { id: 25, label: 'Es Kelapa Muda', image_link: 'public/images/es-kelapa-muda.jpg', id_product: 25, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 26 - Es Campur
      { id: 26, label: 'Es Campur', image_link: 'public/images/es-campur.jpg', id_product: 26, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 27 - Es Cendol
      { id: 27, label: 'Es Cendol', image_link: 'public/images/es-cendol.jpg', id_product: 27, id_product_varian: null, created_at: new Date(), updated_at: new Date() },

      // === MINUMAN PANAS ===
      // Product id: 28 - Teh Hangat
      { id: 28, label: 'Teh Hangat', image_link: 'public/images/teh-hangat.jpeg', id_product: 28, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 29 - Wedang Jahe
      { id: 29, label: 'Wedang Jahe', image_link: 'public/images/wedang-jahe.jpg', id_product: 29, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 30 - Coklat Panas
      { id: 30, label: 'Coklat Panas', image_link: 'public/images/coklat-panas.jpg', id_product: 30, id_product_varian: null, created_at: new Date(), updated_at: new Date() },

      // === KOPI ===
      // Product id: 31 - Kopi Hitam
      { id: 31, label: 'Kopi Hitam', image_link: 'public/images/kopi-hitam.jpg', id_product: 31, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 32 - Kopi Susu
      { id: 32, label: 'Kopi Susu', image_link: 'public/images/kopi-susu.jpg', id_product: 32, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 33 - Cappuccino
      { id: 33, label: 'Cappuccino', image_link: 'public/images/cappuccino.jpg', id_product: 33, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 34 - Americano
      { id: 34, label: 'Americano', image_link: 'public/images/americano.jpg', id_product: 34, id_product_varian: null, created_at: new Date(), updated_at: new Date() },

      // === JUS & SMOOTHIE ===
      // Product id: 35 - Jus Alpukat
      { id: 35, label: 'Jus Alpukat', image_link: 'public/images/jus-alpukat.jpeg', id_product: 35, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 36 - Jus Mangga
      { id: 36, label: 'Jus Mangga', image_link: 'public/images/jus-mangga.jpg', id_product: 36, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 37 - Jus Strawberry
      { id: 37, label: 'Jus Strawberry', image_link: 'public/images/jus-strawberry.jpg', id_product: 37, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 38 - Green Smoothie
      { id: 38, label: 'Green Smoothie', image_link: 'public/images/green-smoothie.jpg', id_product: 38, id_product_varian: null, created_at: new Date(), updated_at: new Date() },

      // === DESSERT ===
      // Product id: 39 - Pudding Coklat
      { id: 39, label: 'Pudding Coklat', image_link: 'public/images/pudding-coklat.jpg', id_product: 39, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 40 - Brownies
      { id: 40, label: 'Brownies', image_link: 'public/images/brownies.jpg', id_product: 40, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 41 - Pisang Bakar
      { id: 41, label: 'Pisang Bakar', image_link: 'public/images/pisang-bakar.jpg', id_product: 41, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 42 - Es Krim
      { id: 42, label: 'Es Krim', image_link: 'public/images/es-krim.jpeg', id_product: 42, id_product_varian: null, created_at: new Date(), updated_at: new Date() },

      // === PAKET HEMAT ===
      // Product id: 43 - Paket Nasi Ayam Geprek
      { id: 43, label: 'Paket Nasi Ayam Geprek', image_link: 'public/images/paket-nasi-ayam-geprek.jpeg', id_product: 43, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 44 - Paket Nasi Goreng Komplit
      { id: 44, label: 'Paket Nasi Goreng Komplit', image_link: 'public/images/paket-nasi-goreng-komplit.jpg', id_product: 44, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
      // Product id: 45 - Paket Makan Berdua
      { id: 45, label: 'Paket Makan Berdua', image_link: 'public/images/paket-makan-berdua.jpg', id_product: 45, id_product_varian: null, created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('images', null, {});
  },
};
