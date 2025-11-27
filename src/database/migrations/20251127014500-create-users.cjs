const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
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
      role: {
        type: DataTypes.ENUM('admin', 'cashier'),
        field: 'role',
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        field: 'email',
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(255),
        field: 'password',
        allowNull: false
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
    await queryInterface.dropTable('users');
  },
};