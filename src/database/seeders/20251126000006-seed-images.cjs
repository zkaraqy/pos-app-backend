'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('images', [
      {
        id: 1,
        label: 'Nasi Goreng Main',
        image_link: '/images/products/nasi-goreng-1.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        label: 'Mie Goreng Main',
        image_link: '/images/products/mie-goreng-1.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        label: 'Ayam Bakar Main',
        image_link: '/images/products/ayam-bakar-1.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        label: 'Soto Ayam Main',
        image_link: '/images/products/soto-ayam-1.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        label: 'Es Teh Main',
        image_link: '/images/products/es-teh-1.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        label: 'Kopi Hitam Main',
        image_link: '/images/products/kopi-hitam-1.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('images', null, {});
  },
};
