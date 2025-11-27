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

type ImageAssociations = 'product' | 'productVarian'

export class Image extends Model<
  InferAttributes<Image, {omit: ImageAssociations}>,
  InferCreationAttributes<Image, {omit: ImageAssociations}>
> {
  declare id: CreationOptional<number>
  declare label: string
  declare imageLink: string
  declare idProduct: number | null
  declare idProductVarian: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Image belongsTo Product
  declare product?: NonAttribute<Product>
  declare getProduct: BelongsToGetAssociationMixin<Product>
  declare setProduct: BelongsToSetAssociationMixin<Product, number>
  declare createProduct: BelongsToCreateAssociationMixin<Product>
  
  // Image belongsTo ProductVarian
  declare productVarian?: NonAttribute<ProductVarian>
  declare getProductVarian: BelongsToGetAssociationMixin<ProductVarian>
  declare setProductVarian: BelongsToSetAssociationMixin<ProductVarian, number>
  declare createProductVarian: BelongsToCreateAssociationMixin<ProductVarian>
  
  declare static associations: {
    product: Association<Image, Product>,
    productVarian: Association<Image, ProductVarian>
  }

  static initModel(sequelize: Sequelize): typeof Image {
    Image.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      label: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      imageLink: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      idProduct: {
        type: DataTypes.INTEGER
      },
      idProductVarian: {
        type: DataTypes.INTEGER
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
    
    return Image
  }
}
