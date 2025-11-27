const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING(255),
        field: 'name',
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description'
      },
      price: {
        type: DataTypes.DECIMAL.UNSIGNED,
        field: 'price'
      },
      stock: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'stock',
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  },
};