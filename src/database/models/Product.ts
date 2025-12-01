import {
  Association,
  type CreationOptional,
  DataTypes,
  type HasManyGetAssociationsMixin,
  type HasManySetAssociationsMixin,
  type HasManyAddAssociationMixin,
  type HasManyAddAssociationsMixin,
  type HasManyCreateAssociationMixin,
  type HasManyRemoveAssociationMixin,
  type HasManyRemoveAssociationsMixin,
  type HasManyHasAssociationMixin,
  type HasManyHasAssociationsMixin,
  type HasManyCountAssociationsMixin,
  type InferCreationAttributes,
  type InferAttributes,
  Model,
  type NonAttribute,
  Sequelize
} from 'sequelize'
import type { Image } from './Image.js'
import type { ProductCategory } from './ProductCategory.js'
import type { ProductVarian } from './ProductVarian.js'
import type { TransactionDetail } from './TransactionDetail.js'

type ProductAssociations = 'transactionDetails' | 'productVarians' | 'productCategories' | 'images'

export class Product extends Model<
  InferAttributes<Product, {omit: ProductAssociations}>,
  InferCreationAttributes<Product, {omit: ProductAssociations}>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare description: string | null
  declare price: number | null
  declare stock: number
  declare isActive: boolean
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Product hasMany TransactionDetail
  declare transactionDetails?: NonAttribute<TransactionDetail[]>
  declare getTransactionDetails: HasManyGetAssociationsMixin<TransactionDetail>
  declare setTransactionDetails: HasManySetAssociationsMixin<TransactionDetail, number>
  declare addTransactionDetail: HasManyAddAssociationMixin<TransactionDetail, number>
  declare addTransactionDetails: HasManyAddAssociationsMixin<TransactionDetail, number>
  declare createTransactionDetail: HasManyCreateAssociationMixin<TransactionDetail>
  declare removeTransactionDetail: HasManyRemoveAssociationMixin<TransactionDetail, number>
  declare removeTransactionDetails: HasManyRemoveAssociationsMixin<TransactionDetail, number>
  declare hasTransactionDetail: HasManyHasAssociationMixin<TransactionDetail, number>
  declare hasTransactionDetails: HasManyHasAssociationsMixin<TransactionDetail, number>
  declare countTransactionDetails: HasManyCountAssociationsMixin
  
  // Product hasMany ProductVarian
  declare productVarians?: NonAttribute<ProductVarian[]>
  declare getProductVarians: HasManyGetAssociationsMixin<ProductVarian>
  declare setProductVarians: HasManySetAssociationsMixin<ProductVarian, number>
  declare addProductVarian: HasManyAddAssociationMixin<ProductVarian, number>
  declare addProductVarians: HasManyAddAssociationsMixin<ProductVarian, number>
  declare createProductVarian: HasManyCreateAssociationMixin<ProductVarian>
  declare removeProductVarian: HasManyRemoveAssociationMixin<ProductVarian, number>
  declare removeProductVarians: HasManyRemoveAssociationsMixin<ProductVarian, number>
  declare hasProductVarian: HasManyHasAssociationMixin<ProductVarian, number>
  declare hasProductVarians: HasManyHasAssociationsMixin<ProductVarian, number>
  declare countProductVarians: HasManyCountAssociationsMixin
  
  // Product hasMany ProductCategory
  declare productCategories?: NonAttribute<ProductCategory[]>
  declare getProductCategories: HasManyGetAssociationsMixin<ProductCategory>
  declare setProductCategories: HasManySetAssociationsMixin<ProductCategory, number>
  declare addProductCategory: HasManyAddAssociationMixin<ProductCategory, number>
  declare addProductCategories: HasManyAddAssociationsMixin<ProductCategory, number>
  declare createProductCategory: HasManyCreateAssociationMixin<ProductCategory>
  declare removeProductCategory: HasManyRemoveAssociationMixin<ProductCategory, number>
  declare removeProductCategories: HasManyRemoveAssociationsMixin<ProductCategory, number>
  declare hasProductCategory: HasManyHasAssociationMixin<ProductCategory, number>
  declare hasProductCategories: HasManyHasAssociationsMixin<ProductCategory, number>
  declare countProductCategories: HasManyCountAssociationsMixin
  
  // Product hasMany Image
  declare images?: NonAttribute<Image[]>
  declare getImages: HasManyGetAssociationsMixin<Image>
  declare setImages: HasManySetAssociationsMixin<Image, number>
  declare addImage: HasManyAddAssociationMixin<Image, number>
  declare addImages: HasManyAddAssociationsMixin<Image, number>
  declare createImage: HasManyCreateAssociationMixin<Image>
  declare removeImage: HasManyRemoveAssociationMixin<Image, number>
  declare removeImages: HasManyRemoveAssociationsMixin<Image, number>
  declare hasImage: HasManyHasAssociationMixin<Image, number>
  declare hasImages: HasManyHasAssociationsMixin<Image, number>
  declare countImages: HasManyCountAssociationsMixin
  
  declare static associations: {
    transactionDetails: Association<Product, TransactionDetail>,
    productVarians: Association<Product, ProductVarian>,
    productCategories: Association<Product, ProductCategory>,
    images: Association<Product, Image>
  }

  static initModel(sequelize: Sequelize): typeof Product {
    Product.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      price: {
        type: DataTypes.DECIMAL.UNSIGNED
      },
      stock: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize
    })
    
    return Product
  }
}
