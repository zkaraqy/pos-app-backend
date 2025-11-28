import {
  Association,
  type BelongsToGetAssociationMixin,
  type BelongsToSetAssociationMixin,
  type BelongsToCreateAssociationMixin,
  type CreationOptional,
  DataTypes,
  type InferCreationAttributes,
  type InferAttributes,
  Model,
  type NonAttribute,
  Sequelize
} from 'sequelize'
import type { Product } from './Product.js'
import type { ProductVarian } from './ProductVarian.js'
import type { Transaction } from './Transaction.js'

type TransactionDetailAssociations = 'transaction' | 'product' | 'productVarian'

export class TransactionDetail extends Model<
  InferAttributes<TransactionDetail, {omit: TransactionDetailAssociations}>,
  InferCreationAttributes<TransactionDetail, {omit: TransactionDetailAssociations}>
> {
  declare id: CreationOptional<number>
  declare idTransaction: number
  declare idProduct: number | null
  declare idProductVarian: number | null
  declare price: number
  declare quantity: number
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // TransactionDetail belongsTo Transaction
  declare transaction?: NonAttribute<Transaction>
  declare getTransaction: BelongsToGetAssociationMixin<Transaction>
  declare setTransaction: BelongsToSetAssociationMixin<Transaction, number>
  declare createTransaction: BelongsToCreateAssociationMixin<Transaction>
  
  // TransactionDetail belongsTo Product
  declare product?: NonAttribute<Product>
  declare getProduct: BelongsToGetAssociationMixin<Product>
  declare setProduct: BelongsToSetAssociationMixin<Product, number>
  declare createProduct: BelongsToCreateAssociationMixin<Product>
  
  // TransactionDetail belongsTo ProductVarian
  declare productVarian?: NonAttribute<ProductVarian>
  declare getProductVarian: BelongsToGetAssociationMixin<ProductVarian>
  declare setProductVarian: BelongsToSetAssociationMixin<ProductVarian, number>
  declare createProductVarian: BelongsToCreateAssociationMixin<ProductVarian>
  
  declare static associations: {
    transaction: Association<TransactionDetail, Transaction>,
    product: Association<TransactionDetail, Product>,
    productVarian: Association<TransactionDetail, ProductVarian>
  }

  static initModel(sequelize: Sequelize): typeof TransactionDetail {
    TransactionDetail.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      idTransaction: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      idProduct: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      idProductVarian: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    
    return TransactionDetail
  }
}
