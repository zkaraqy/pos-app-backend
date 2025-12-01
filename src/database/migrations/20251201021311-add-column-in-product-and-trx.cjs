const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'products',
      'is_active',
      {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    );
    await queryInterface.addColumn(
      'transactions',
      'transaction_status',
      {
        type: DataTypes.ENUM('waiting', 'process', 'done'),
        allowNull: false,
        defaultValue: 'waiting',
      }
    );
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'is_active');
    await queryInterface.removeColumn('transactions', 'transaction_status');
  },
};