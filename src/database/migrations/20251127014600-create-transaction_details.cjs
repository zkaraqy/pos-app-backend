const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaction_details', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      idTransaction: {
        type: DataTypes.INTEGER,
        field: 'id_transaction',
        allowNull: false
      },
      idProduct: {
        type: DataTypes.INTEGER,
        field: 'id_product'
      },
      idProductVarian: {
        type: DataTypes.INTEGER,
        field: 'id_product_varian'
      },
      price: {
        type: DataTypes.DECIMAL,
        field: 'price',
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        field: 'quantity',
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      transactionsId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'transactions_id'
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'product_id'
      },
      productVarianId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'product_varian_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transaction_details');
  },
};