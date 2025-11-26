import { Model, DataTypes, type Optional } from 'sequelize';
import { sequelize } from '../index.js';

interface ProductCategoryAttributes {
  id: number;
  id_product: number;
  id_category: number;
}

interface ProductCategoryCreationAttributes extends Optional<ProductCategoryAttributes, 'id'> {}

class ProductCategory extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes> implements ProductCategoryAttributes {
  public id!: number;
  public id_product!: number;
  public id_category!: number;
}

ProductCategory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_product: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    id_category: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'product_category',
    timestamps: false,
    underscored: true,
  }
);

export default ProductCategory;
