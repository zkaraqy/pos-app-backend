import { Model, DataTypes, type Optional } from 'sequelize';
import { sequelize } from '../index.js';

interface ProductVarianAttributes {
  id: number;
  id_product: number;
  name: string;
  description: string | null;
  stock: number;
  price: number;
  created_at: Date;
  updated_at: Date;
}

interface ProductVarianCreationAttributes extends Optional<ProductVarianAttributes, 'id' | 'description' | 'stock' | 'created_at' | 'updated_at'> {}

class ProductVarian extends Model<ProductVarianAttributes, ProductVarianCreationAttributes> implements ProductVarianAttributes {
  public id!: number;
  public id_product!: number;
  public name!: string;
  public description!: string | null;
  public stock!: number;
  public price!: number;
  public created_at!: Date;
  public updated_at!: Date;

  public readonly product?: any;
  public readonly images?: any[];
  public readonly transactionDetails?: any[];
}

ProductVarian.init(
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.DECIMAL(8, 2),
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
    tableName: 'product_varian',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  }
);

export default ProductVarian;
