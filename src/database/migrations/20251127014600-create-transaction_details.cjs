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
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id_transaction',
        allowNull: false
      },
      idProduct: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id_product'
      },
      idProductVarian: {
        type: DataTypes.INTEGER.UNSIGNED,
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
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transaction_details');
  },
};