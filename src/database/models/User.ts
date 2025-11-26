import { Model, DataTypes, type Optional } from 'sequelize';
import { sequelize } from '../index.js';

interface UserAttributes {
  id: number;
  name: string;
  role: 'admin' | 'cashier';
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public role!: 'admin' | 'cashier';
  public email!: string;
  public password!: string;
  public created_at!: Date;
  public updated_at!: Date;

  public readonly transactions?: any[];
}

User.init(
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
    role: {
      type: DataTypes.ENUM('admin', 'cashier'),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
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
    tableName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  }
);

export default User;
