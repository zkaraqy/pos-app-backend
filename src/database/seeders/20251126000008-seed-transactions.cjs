'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    await queryInterface.bulkInsert('transactions', [
      {
        id: 1,
        id_cashier: 2, // Budi Santoso
        ref: `TRX${Date.now()}-001`,
        type: 'makan_ditempat',
        table_number: 5,
        customer_name: 'Ahmad Rizki',
        customer_email: null,
        payment_method: 'cash',
        status: 'completed',
        created_at: new Date(today.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        updated_at: new Date(today.getTime() - 2 * 60 * 60 * 1000),
      },
      {
        id: 2,
        id_cashier: 3, // Siti Nurhaliza
        ref: `TRX${Date.now()}-002`,
        type: 'bawa_pulang',
        table_number: null,
        customer_name: 'Dewi Lestari',
        customer_email: 'dewi@example.com',
        payment_method: 'qris',
        status: 'completed',
        created_at: new Date(today.getTime() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
        updated_at: new Date(today.getTime() - 1.5 * 60 * 60 * 1000),
      },
      {
        id: 3,
        id_cashier: 2, // Budi Santoso
        ref: `TRX${Date.now()}-003`,
        type: 'makan_ditempat',
        table_number: 3,
        customer_name: 'Andi Wijaya',
        customer_email: null,
        payment_method: 'cash',
        status: 'waiting_payment',
        created_at: new Date(today.getTime() - 30 * 60 * 1000), // 30 minutes ago
        updated_at: new Date(today.getTime() - 30 * 60 * 1000),
      },
      {
        id: 4,
        id_cashier: 3, // Siti Nurhaliza
        ref: `TRX${Date.now()}-004`,
        type: 'bawa_pulang',
        table_number: null,
        customer_name: 'Rina Susanti',
        customer_email: 'rina@example.com',
        payment_method: 'qris',
        status: 'completed',
        created_at: new Date(today.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
        updated_at: new Date(today.getTime() - 3 * 60 * 60 * 1000),
      },
      {
        id: 5,
        id_cashier: 2, // Budi Santoso
        ref: `TRX${Date.now()}-005`,
        type: 'makan_ditempat',
        table_number: 8,
        customer_name: null,
        customer_email: null,
        payment_method: 'cash',
        status: 'canceled',
        created_at: new Date(today.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
        updated_at: new Date(today.getTime() - 4 * 60 * 60 * 1000),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};
