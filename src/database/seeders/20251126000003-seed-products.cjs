'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product', [
      {
        id: 1,
        name: 'Nasi Goreng',
        description: 'Nasi goreng spesial dengan telur, ayam, dan sayuran',
        price: 25000.00,
        stock: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Mie Goreng',
        description: 'Mie goreng dengan topping lengkap',
        price: 22000.00,
        stock: 40,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Ayam Bakar',
        description: 'Ayam bakar bumbu kecap dengan nasi dan sambal',
        price: 30000.00,
        stock: 25,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: 'Soto Ayam',
        description: 'Soto ayam kuah bening dengan nasi dan kerupuk',
        price: 20000.00,
        stock: 35,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        name: 'Es Teh Manis',
        description: 'Es teh manis segar',
        price: 5000.00,
        stock: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        name: 'Es Jeruk',
        description: 'Es jeruk peras segar',
        price: 8000.00,
        stock: 80,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        name: 'Kopi Hitam',
        description: 'Kopi hitam tubruk tanpa gula',
        price: null, // Akan ada varian
        stock: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        name: 'Keripik Singkong',
        description: 'Keripik singkong renyah berbagai rasa',
        price: 15000.00,
        stock: 60,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        name: 'Pisang Goreng',
        description: 'Pisang goreng crispy',
        price: 10000.00,
        stock: 45,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        name: 'Brownie',
        description: 'Brownie coklat lembut',
        price: 18000.00,
        stock: 30,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product', null, {});
  },
};
