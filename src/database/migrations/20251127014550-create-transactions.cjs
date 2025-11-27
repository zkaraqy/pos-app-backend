const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      idCashier: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id_cashier',
        allowNull: false
      },
      ref: {
        type: DataTypes.STRING(255),
        field: 'ref',
        allowNull: false,
        unique: true
      },
      type: {
        type: DataTypes.ENUM('makan_ditempat', 'bawa_pulang'),
        field: 'type',
        allowNull: false
      },
      tableNumber: {
        type: DataTypes.INTEGER,
        field: 'table_number'
      },
      customerName: {
        type: DataTypes.STRING(255),
        field: 'customer_name'
      },
      customerEmail: {
        type: DataTypes.STRING(255),
        field: 'customer_email'
      },
      paymentMethod: {
        type: DataTypes.ENUM('qris', 'cash'),
        field: 'payment_method',
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('waiting_payment', 'canceled', 'completed'),
        field: 'status',
        allowNull: false,
        defaultValue: 'waiting_payment'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'user_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  },
};