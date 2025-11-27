'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_varians', [
      {
        id: 1,
        id_product: 7, // Kopi Hitam
        name: 'Kopi Hitam Small',
        description: 'Ukuran kecil 200ml',
        stock: 50,
        price: 8000.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        id_product: 7, // Kopi Hitam
        name: 'Kopi Hitam Medium',
        description: 'Ukuran sedang 300ml',
        stock: 45,
        price: 12000.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        id_product: 7, // Kopi Hitam
        name: 'Kopi Hitam Large',
        description: 'Ukuran besar 500ml',
        stock: 40,
        price: 15000.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        id_product: 1, // Nasi Goreng
        name: 'Nasi Goreng Jumbo',
        description: 'Porsi jumbo dengan double topping',
        stock: 20,
        price: 35000.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        id_product: 8, // Keripik Singkong
        name: 'Keripik Singkong Balado',
        description: 'Rasa balado pedas',
        stock: 30,
        price: 15000.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        id_product: 8, // Keripik Singkong
        name: 'Keripik Singkong BBQ',
        description: 'Rasa BBQ gurih',
        stock: 30,
        price: 15000.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_varians', null, {});
  },
};
