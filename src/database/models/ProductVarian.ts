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
import type { TransactionDetail } from './TransactionDetail.js'

type ProductVarianAssociations = 'transactionDetails' | 'images'

export class ProductVarian extends Model<
  InferAttributes<ProductVarian, {omit: ProductVarianAssociations}>,
  InferCreationAttributes<ProductVarian, {omit: ProductVarianAssociations}>
> {
  declare id: CreationOptional<number>
  declare idProduct: number
  declare name: string
  declare description: string | null
  declare stock: number
  declare price: number
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // ProductVarian hasMany TransactionDetail
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
  
  // ProductVarian hasMany Image
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
    transactionDetails: Association<ProductVarian, TransactionDetail>,
    images: Association<ProductVarian, Image>
  }

  static initModel(sequelize: Sequelize): typeof ProductVarian {
    ProductVarian.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      idProduct: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      price: {
        type: DataTypes.DECIMAL.UNSIGNED,
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
    
    return ProductVarian
  }
}
