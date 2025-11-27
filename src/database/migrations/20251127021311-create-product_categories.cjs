const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_categories', {
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
      idCategory: {
        type: DataTypes.INTEGER,
        field: 'id_category',
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
      },
      categoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'category_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_categories');
  },
};