'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    await queryInterface.bulkInsert('transactions', [
      // Transaksi 1 - Makan di tempat, keluarga
      {
        id: 1,
        id_cashier: 2,
        ref: 'TRX-20251128-001',
        type: 'makan_ditempat',
        table_number: 5,
        customer_name: 'Keluarga Pak Budi',
        customer_email: null,
        payment_method: 'cash',
        status: 'completed',
        created_at: new Date(today.getTime() - 4 * 60 * 60 * 1000),
        updated_at: new Date(today.getTime() - 4 * 60 * 60 * 1000),
      },
      // Transaksi 2 - Bawa pulang, order kopi
      {
        id: 2,
        id_cashier: 3,
        ref: 'TRX-20251128-002',
        type: 'bawa_pulang',
        table_number: null,
        customer_name: 'Andi',
        customer_email: 'andi@email.com',
        payment_method: 'qris',
        status: 'completed',
        created_at: new Date(today.getTime() - 3.5 * 60 * 60 * 1000),
        updated_at: new Date(today.getTime() - 3.5 * 60 * 60 * 1000),
      },
      // Transaksi 3 - Makan siang kantor
      {
        id: 3,
        id_cashier: 2,
        ref: 'TRX-20251128-003',
        type: 'makan_ditempat',
        table_number: 8,
        customer_name: 'Tim Marketing ABC',
        customer_email: null,
        payment_method: 'qris',
        status: 'completed',
        created_at: new Date(today.getTime() - 3 * 60 * 60 * 1000),
        updated_at: new Date(today.getTime() - 3 * 60 * 60 * 1000),
      },
      // Transaksi 4 - Dessert dan minuman
      {
        id: 4,
        id_cashier: 3,
        ref: 'TRX-20251128-004',
        type: 'makan_ditempat',
        table_number: 2,
        customer_name: 'Sari & Dewi',
        customer_email: null,
        payment_method: 'cash',
        status: 'completed',
        created_at: new Date(today.getTime() - 2.5 * 60 * 60 * 1000),
        updated_at: new Date(today.getTime() - 2.5 * 60 * 60 * 1000),
      },
      // Transaksi 5 - Waiting payment
      {
        id: 5,
        id_cashier: 2,
        ref: 'TRX-20251128-005',
        type: 'makan_ditempat',
        table_number: 12,
        customer_name: 'Rudi',
        customer_email: null,
        payment_method: 'cash',
        status: 'waiting_payment',
        created_at: new Date(today.getTime() - 30 * 60 * 1000),
        updated_at: new Date(today.getTime() - 30 * 60 * 1000),
      },
      // Transaksi 6 - Canceled
      {
        id: 6,
        id_cashier: 3,
        ref: 'TRX-20251128-006',
        type: 'bawa_pulang',
        table_number: null,
        customer_name: 'Anonymous',
        customer_email: null,
        payment_method: 'qris',
        status: 'canceled',
        created_at: new Date(today.getTime() - 2 * 60 * 60 * 1000),
        updated_at: new Date(today.getTime() - 2 * 60 * 60 * 1000),
      },
      // Transaksi 7 - Paket hemat
      {
        id: 7,
        id_cashier: 2,
        ref: 'TRX-20251128-007',
        type: 'bawa_pulang',
        table_number: null,
        customer_name: 'Gojek - Ratna',
        customer_email: null,
        payment_method: 'qris',
        status: 'completed',
        created_at: new Date(today.getTime() - 1.5 * 60 * 60 * 1000),
        updated_at: new Date(today.getTime() - 1.5 * 60 * 60 * 1000),
      },
      // Transaksi 8 - Seafood order
      {
        id: 8,
        id_cashier: 3,
        ref: 'TRX-20251128-008',
        type: 'makan_ditempat',
        table_number: 10,
        customer_name: 'Pak Hendra',
        customer_email: 'hendra@company.com',
        payment_method: 'qris',
        status: 'completed',
        created_at: new Date(today.getTime() - 1 * 60 * 60 * 1000),
        updated_at: new Date(today.getTime() - 1 * 60 * 60 * 1000),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};
