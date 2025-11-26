import { Model, DataTypes, type Optional } from 'sequelize';
import { sequelize } from '../index.js';

interface TransactionAttributes {
  id: number;
  id_cashier: number;
  ref: string;
  type: 'makan_ditempat' | 'bawa_pulang';
  table_number: number | null;
  customer_name: string | null;
  customer_email: string | null;
  payment_method: 'qris' | 'cash';
  status: 'waiting_payment' | 'canceled' | 'completed';
  created_at: Date;
  updated_at: Date;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id' | 'table_number' | 'customer_name' | 'customer_email' | 'status' | 'created_at' | 'updated_at'> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: number;
  public id_cashier!: number;
  public ref!: string;
  public type!: 'makan_ditempat' | 'bawa_pulang';
  public table_number!: number | null;
  public customer_name!: string | null;
  public customer_email!: string | null;
  public payment_method!: 'qris' | 'cash';
  public status!: 'waiting_payment' | 'canceled' | 'completed';
  public created_at!: Date;
  public updated_at!: Date;

  public readonly cashier?: any;
  public readonly details?: any[];
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cashier: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    ref: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM('makan_ditempat', 'bawa_pulang'),
      allowNull: false,
    },
    table_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    customer_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    customer_email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.ENUM('qris', 'cash'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('waiting_payment', 'canceled', 'completed'),
      allowNull: false,
      defaultValue: 'waiting_payment',
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
    tableName: 'transactions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  }
);

export default Transaction;
