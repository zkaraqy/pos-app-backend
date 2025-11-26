import { Model, DataTypes, type Optional } from 'sequelize';
import { sequelize } from '../index.js';

interface CategoryAttributes {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public created_at!: Date;
  public updated_at!: Date;

  public readonly products?: any[];
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'category',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  }
);

export default Category;
