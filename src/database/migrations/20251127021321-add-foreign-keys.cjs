const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('product_varians', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'product_varians_product_id_fkey',
      references: {
        table: 'products',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('images', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'images_product_id_fkey',
      references: {
        table: 'products',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('images', {
      fields: ['product_varian_id'],
      type: 'foreign key',
      name: 'images_product_varian_id_fkey',
      references: {
        table: 'product_varians',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('transactions', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'transactions_user_id_fkey',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('transaction_details', {
      fields: ['transactions_id'],
      type: 'foreign key',
      name: 'transaction_details_transactions_id_fkey',
      references: {
        table: 'transactions',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('transaction_details', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'transaction_details_product_id_fkey',
      references: {
        table: 'products',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('transaction_details', {
      fields: ['product_varian_id'],
      type: 'foreign key',
      name: 'transaction_details_product_varian_id_fkey',
      references: {
        table: 'product_varians',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('product_categories', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'product_categories_product_id_fkey',
      references: {
        table: 'products',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('product_categories', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'product_categories_category_id_fkey',
      references: {
        table: 'categories',
        field: 'id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('product_varians', 'product_varians_product_id_fkey')
    await queryInterface.removeConstraint('images', 'images_product_id_fkey')
    await queryInterface.removeConstraint('images', 'images_product_varian_id_fkey')
    await queryInterface.removeConstraint('transactions', 'transactions_user_id_fkey')
    await queryInterface.removeConstraint('transaction_details', 'transaction_details_transactions_id_fkey')
    await queryInterface.removeConstraint('transaction_details', 'transaction_details_product_id_fkey')
    await queryInterface.removeConstraint('transaction_details', 'transaction_details_product_varian_id_fkey')
    await queryInterface.removeConstraint('product_categories', 'product_categories_product_id_fkey')
    await queryInterface.removeConstraint('product_categories', 'product_categories_category_id_fkey')
  }
};