import type { Sequelize, Model } from 'sequelize'
import { User } from './User.js'
import { Product } from './Product.js'
import { Category } from './Category.js'
import { ProductVarian } from './ProductVarian.js'
import { Image } from './Image.js'
import { Transaction } from './Transaction.js'
import { TransactionDetail } from './TransactionDetail.js'
import { ProductCategory } from './ProductCategory.js'

export {
  User,
  Product,
  Category,
  ProductVarian,
  Image,
  Transaction,
  TransactionDetail,
  ProductCategory
}

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize)
  Product.initModel(sequelize)
  Category.initModel(sequelize)
  ProductVarian.initModel(sequelize)
  Image.initModel(sequelize)
  Transaction.initModel(sequelize)
  TransactionDetail.initModel(sequelize)
  ProductCategory.initModel(sequelize)

  User.hasMany(Transaction, {
    as: 'transactions',
    foreignKey: 'id_cashier'
  })
  Product.hasMany(TransactionDetail, {
    as: 'transactionDetails',
    foreignKey: 'id_product'
  })
  Product.hasMany(ProductVarian, {
    as: 'productVarians',
    foreignKey: 'id_product'
  })
  Product.hasMany(ProductCategory, {
    as: 'productCategories',
    foreignKey: 'id_product'
  })
  Product.hasMany(Image, {
    as: 'images',
    foreignKey: 'id_product'
  })
  Category.hasMany(ProductCategory, {
    as: 'productCategories',
    foreignKey: 'id_category'
  })
  ProductVarian.hasMany(TransactionDetail, {
    as: 'transactionDetails',
    foreignKey: 'id_product_varian'
  })
  ProductVarian.hasMany(Image, {
    as: 'images',
    foreignKey: 'id_product_varian'
  })
  Image.belongsTo(Product, {
    as: 'product',
    foreignKey: 'id_product'
  })
  Image.belongsTo(ProductVarian, {
    as: 'productVarian',
    foreignKey: 'id_product_varian'
  })
  Transaction.hasMany(TransactionDetail, {
    as: 'transactionDetails',
    foreignKey: 'id_transaction'
  })
  Transaction.belongsTo(User, {
    as: 'user',
    foreignKey: 'id_cashier'
  })
  TransactionDetail.belongsTo(Transaction, {
    as: 'transaction',
    foreignKey: 'id_transaction'
  })
  TransactionDetail.belongsTo(Product, {
    as: 'product',
    foreignKey: 'id_product'
  })
  TransactionDetail.belongsTo(ProductVarian, {
    as: 'productVarian',
    foreignKey: 'id_product_varian'
  })
  ProductCategory.belongsTo(Product, {
    as: 'product',
    foreignKey: 'id_product'
  })
  ProductCategory.belongsTo(Category, {
    as: 'category',
    foreignKey: 'id_category'
  })

  return {
    User,
    Product,
    Category,
    ProductVarian,
    Image,
    Transaction,
    TransactionDetail,
    ProductCategory
  }
}
