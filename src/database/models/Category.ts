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
import type { ProductCategory } from './ProductCategory.js'

type CategoryAssociations = 'productCategories'

export class Category extends Model<
  InferAttributes<Category, {omit: CategoryAssociations}>,
  InferCreationAttributes<Category, {omit: CategoryAssociations}>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Category hasMany ProductCategory
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
  
  declare static associations: {
    productCategories: Association<Category, ProductCategory>
  }

  static initModel(sequelize: Sequelize): typeof Category {
    Category.init({
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
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize
    })
    
    return Category
  }
}
