import { Model, DataTypes, type Optional } from 'sequelize';
import { sequelize } from '../index.js';

interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number | null;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'price' | 'stock' | 'created_at' | 'updated_at'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number | null;
  public stock!: number;
  public created_at!: Date;
  public updated_at!: Date;

  public readonly categories?: any[];
  public readonly variants?: any[];
  public readonly images?: any[];
  public readonly transactionDetails?: any[];
}

Product.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    tableName: 'product',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  }
);

export default Product;
