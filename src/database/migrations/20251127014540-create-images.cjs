const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('images', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      label: {
        type: DataTypes.STRING(255),
        field: 'label',
        allowNull: false
      },
      imageLink: {
        type: DataTypes.STRING(255),
        field: 'image_link',
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
      productVarianId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'product_varian_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('images');
  },
};