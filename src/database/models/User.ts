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
import type { Transaction } from './Transaction.js'

type UserAssociations = 'transactions'

export class User extends Model<
  InferAttributes<User, {omit: UserAssociations}>,
  InferCreationAttributes<User, {omit: UserAssociations}>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare role: 'admin' | 'cashier'
  declare email: string
  declare password: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // User hasMany Transaction
  declare transactions?: NonAttribute<Transaction[]>
  declare getTransactions: HasManyGetAssociationsMixin<Transaction>
  declare setTransactions: HasManySetAssociationsMixin<Transaction, number>
  declare addTransaction: HasManyAddAssociationMixin<Transaction, number>
  declare addTransactions: HasManyAddAssociationsMixin<Transaction, number>
  declare createTransaction: HasManyCreateAssociationMixin<Transaction>
  declare removeTransaction: HasManyRemoveAssociationMixin<Transaction, number>
  declare removeTransactions: HasManyRemoveAssociationsMixin<Transaction, number>
  declare hasTransaction: HasManyHasAssociationMixin<Transaction, number>
  declare hasTransactions: HasManyHasAssociationsMixin<Transaction, number>
  declare countTransactions: HasManyCountAssociationsMixin
  
  declare static associations: {
    transactions: Association<User, Transaction>
  }

  static initModel(sequelize: Sequelize): typeof User {
    User.init({
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
      role: {
        type: DataTypes.ENUM('admin', 'cashier'),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
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
    
    return User
  }
}
