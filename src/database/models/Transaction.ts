import {
  Association,
  type BelongsToGetAssociationMixin,
  type BelongsToSetAssociationMixin,
  type BelongsToCreateAssociationMixin,
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
import type { TransactionDetail } from './TransactionDetail.js'
import type { User } from './User.js'

type TransactionAssociations = 'transactionDetails' | 'user'

export class Transaction extends Model<
  InferAttributes<Transaction, {omit: TransactionAssociations}>,
  InferCreationAttributes<Transaction, {omit: TransactionAssociations}>
> {
  declare id: CreationOptional<number>
  declare idCashier: number
  declare ref: string
  declare type: 'makan_ditempat' | 'bawa_pulang'
  declare tableNumber: number | null
  declare customerName: string | null
  declare customerEmail: string | null
  declare paymentMethod: 'qris' | 'cash'
  declare status: 'waiting_payment' | 'canceled' | 'completed'
  declare transactionStatus: 'waiting' | 'process' | 'done'
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Transaction hasMany TransactionDetail
  declare transactionDetails?: NonAttribute<TransactionDetail[]>
  declare getTransactionDetails: HasManyGetAssociationsMixin<TransactionDetail>
  declare setTransactionDetails: HasManySetAssociationsMixin<TransactionDetail, number>
  declare addTransactionDetail: HasManyAddAssociationMixin<TransactionDetail, number>
  declare addTransactionDetails: HasManyAddAssociationsMixin<TransactionDetail, number>
  declare createTransactionDetail: HasManyCreateAssociationMixin<TransactionDetail>
  declare removeTransactionDetail: HasManyRemoveAssociationMixin<TransactionDetail, number>
  declare removeTransactionDetails: HasManyRemoveAssociationsMixin<TransactionDetail, number>
  declare hasTransactionDetail: HasManyHasAssociationMixin<TransactionDetail, number>
  declare hasTransactionDetails: HasManyHasAssociationsMixin<TransactionDetail, number>
  declare countTransactionDetails: HasManyCountAssociationsMixin
  
  // Transaction belongsTo User
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, number>
  declare createUser: BelongsToCreateAssociationMixin<User>
  
  declare static associations: {
    transactionDetails: Association<Transaction, TransactionDetail>,
    user: Association<Transaction, User>
  }

  static initModel(sequelize: Sequelize): typeof Transaction {
    Transaction.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      idCashier: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      ref: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      type: {
        type: DataTypes.ENUM('makan_ditempat', 'bawa_pulang'),
        allowNull: false
      },
      tableNumber: {
        type: DataTypes.INTEGER
      },
      customerName: {
        type: DataTypes.STRING(255)
      },
      customerEmail: {
        type: DataTypes.STRING(255)
      },
      paymentMethod: {
        type: DataTypes.ENUM('qris', 'cash'),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('waiting_payment', 'canceled', 'completed'),
        allowNull: false,
        defaultValue: 'waiting_payment'
      },
      transactionStatus: {
        type: DataTypes.ENUM('waiting', 'process', 'done'),
        allowNull: false,
        defaultValue: 'waiting'
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
    
    return Transaction
  }
}
