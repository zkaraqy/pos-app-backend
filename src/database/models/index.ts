import User from './User.js';
import Product from './Product.js';
import Category from './Category.js';
import ProductCategory from './ProductCategory.js';
import ProductVarian from './ProductVarian.js';
import Image from './Image.js';
import LinkedImage from './LinkedImage.js';
import Transaction from './Transaction.js';
import TransactionDetail from './TransactionDetail.js';


// User - Transaction (One to Many)
User.hasMany(Transaction, {
  foreignKey: 'id_cashier',
  as: 'transactions',
});
Transaction.belongsTo(User, {
  foreignKey: 'id_cashier',
  as: 'cashier',
});

// Product - ProductVarian (One to Many)
Product.hasMany(ProductVarian, {
  foreignKey: 'id_product',
  as: 'variants',
});
ProductVarian.belongsTo(Product, {
  foreignKey: 'id_product',
  as: 'product',
});

// Product - Category (Many to Many through ProductCategory)
Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: 'id_product',
  otherKey: 'id_category',
  as: 'categories',
});
Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: 'id_category',
  otherKey: 'id_product',
  as: 'products',
});

// Product - Image (Many to Many through LinkedImage)
Product.belongsToMany(Image, {
  through: LinkedImage,
  foreignKey: 'id_product',
  otherKey: 'id_image',
  as: 'images',
});
Image.belongsToMany(Product, {
  through: LinkedImage,
  foreignKey: 'id_image',
  otherKey: 'id_product',
  as: 'products',
});

// ProductVarian - Image (Many to Many through LinkedImage)
ProductVarian.belongsToMany(Image, {
  through: LinkedImage,
  foreignKey: 'id_product_varian',
  otherKey: 'id_image',
  as: 'images',
});
Image.belongsToMany(ProductVarian, {
  through: LinkedImage,
  foreignKey: 'id_image',
  otherKey: 'id_product_varian',
  as: 'productVariants',
});

// LinkedImage belongs to Product, ProductVarian, Image
LinkedImage.belongsTo(Product, {
  foreignKey: 'id_product',
  as: 'product',
});
LinkedImage.belongsTo(ProductVarian, {
  foreignKey: 'id_product_varian',
  as: 'productVarian',
});
LinkedImage.belongsTo(Image, {
  foreignKey: 'id_image',
  as: 'image',
});

// Transaction - TransactionDetail (One to Many)
Transaction.hasMany(TransactionDetail, {
  foreignKey: 'id_transaction',
  as: 'details',
});
TransactionDetail.belongsTo(Transaction, {
  foreignKey: 'id_transaction',
  as: 'transaction',
});

// Product - TransactionDetail (One to Many)
Product.hasMany(TransactionDetail, {
  foreignKey: 'id_product',
  as: 'transactionDetails',
});
TransactionDetail.belongsTo(Product, {
  foreignKey: 'id_product',
  as: 'product',
});

// ProductVarian - TransactionDetail (One to Many)
ProductVarian.hasMany(TransactionDetail, {
  foreignKey: 'id_product_varian',
  as: 'transactionDetails',
});
TransactionDetail.belongsTo(ProductVarian, {
  foreignKey: 'id_product_varian',
  as: 'productVarian',
});

export {
  User,
  Product,
  Category,
  ProductCategory,
  ProductVarian,
  Image,
  LinkedImage,
  Transaction,
  TransactionDetail,
};
