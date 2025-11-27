const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_varians', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      idProduct: {
        type: DataTypes.INTEGER,
        field: 'id_product',
        allowNull: false
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
      stock: {
        type: DataTypes.INTEGER,
        field: 'stock',
        allowNull: false,
        defaultValue: 0
      },
      price: {
        type: DataTypes.DECIMAL.UNSIGNED,
        field: 'price',
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
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'product_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_varians');
  },
};