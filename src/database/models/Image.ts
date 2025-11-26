import { Model, DataTypes, type Optional } from 'sequelize';
import { sequelize } from '../index.js';

interface ImageAttributes {
  id: number;
  label: string;
  image_link: string;
  created_at: Date;
  updated_at: Date;
}

interface ImageCreationAttributes extends Optional<ImageAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
  public id!: number;
  public label!: string;
  public image_link!: string;
  public created_at!: Date;
  public updated_at!: Date;

  public readonly products?: any[];
  public readonly productVariants?: any[];
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image_link: {
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
    tableName: 'image',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
  }
);

export default Image;
