'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Admin Utama',
        role: 'admin',
        email: 'admin@kasir.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Budi Santoso',
        role: 'cashier',
        email: 'budi@kasir.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Siti Nurhaliza',
        role: 'cashier',
        email: 'siti@kasir.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
