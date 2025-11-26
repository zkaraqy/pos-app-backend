'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_cashier: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      ref: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      type: {
        type: Sequelize.ENUM('makan_ditempat', 'bawa_pulang'),
        allowNull: false,
      },
      table_number: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      customer_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      customer_email: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      payment_method: {
        type: Sequelize.ENUM('qris', 'cash'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('waiting_payment', 'canceled', 'completed'),
        allowNull: false,
        defaultValue: 'waiting_payment',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('transactions', ['ref'], {
      unique: true,
      name: 'transactions_ref_unique',
    });
    await queryInterface.addIndex('transactions', ['id_cashier']);
    await queryInterface.addIndex('transactions', ['status']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  },
};
