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
import type { Category } from './Category.js'
import type { Product } from './Product.js'

type ProductCategoryAssociations = 'product' | 'category'

export class ProductCategory extends Model<
  InferAttributes<ProductCategory, {omit: ProductCategoryAssociations}>,
  InferCreationAttributes<ProductCategory, {omit: ProductCategoryAssociations}>
> {
  declare id: CreationOptional<number>
  declare idProduct: number
  declare idCategory: number
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // ProductCategory belongsTo Product
  declare product?: NonAttribute<Product>
  declare getProduct: BelongsToGetAssociationMixin<Product>
  declare setProduct: BelongsToSetAssociationMixin<Product, number>
  declare createProduct: BelongsToCreateAssociationMixin<Product>
  
  // ProductCategory belongsTo Category
  declare category?: NonAttribute<Category>
  declare getCategory: BelongsToGetAssociationMixin<Category>
  declare setCategory: BelongsToSetAssociationMixin<Category, number>
  declare createCategory: BelongsToCreateAssociationMixin<Category>
  
  declare static associations: {
    product: Association<ProductCategory, Product>,
    category: Association<ProductCategory, Category>
  }

  static initModel(sequelize: Sequelize): typeof ProductCategory {
    ProductCategory.init({
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
      idCategory: {
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
    
    return ProductCategory
  }
}
