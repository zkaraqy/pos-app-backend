import { Model, DataTypes, type Optional } from 'sequelize';
import { sequelize } from '../index.js';

interface LinkedImageAttributes {
  id: number;
  id_product: number | null;
  id_product_varian: number | null;
  id_image: number;
}

interface LinkedImageCreationAttributes extends Optional<LinkedImageAttributes, 'id' | 'id_product' | 'id_product_varian'> {}

class LinkedImage extends Model<LinkedImageAttributes, LinkedImageCreationAttributes> implements LinkedImageAttributes {
  public id!: number;
  public id_product!: number | null;
  public id_product_varian!: number | null;
  public id_image!: number;

  public readonly product?: any;
  public readonly productVarian?: any;
  public readonly image?: any;
}

LinkedImage.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_product: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    id_product_varian: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    id_image: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'linked_image',
    timestamps: false,
    underscored: true,
  }
);

export default LinkedImage;
