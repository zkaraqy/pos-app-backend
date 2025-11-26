import { Model, DataTypes, type Optional } from 'sequelize';
import { sequelize } from '../index.js';

interface TransactionDetailAttributes {
  id: number;
  id_transaction: number;
  id_product: number | null;
  id_product_varian: number | null;
  price: number;
  quantity: number;
}

interface TransactionDetailCreationAttributes extends Optional<TransactionDetailAttributes, 'id' | 'id_product' | 'id_product_varian'> {}

class TransactionDetail extends Model<TransactionDetailAttributes, TransactionDetailCreationAttributes> implements TransactionDetailAttributes {
  public id!: number;
  public id_transaction!: number;
  public id_product!: number | null;
  public id_product_varian!: number | null;
  public price!: number;
  public quantity!: number;

  public readonly transaction?: any;
  public readonly product?: any;
  public readonly productVarian?: any;
}

TransactionDetail.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_transaction: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    id_product: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    id_product_varian: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'transaction_details',
    timestamps: false,
    underscored: true,
  }
);

export default TransactionDetail;
