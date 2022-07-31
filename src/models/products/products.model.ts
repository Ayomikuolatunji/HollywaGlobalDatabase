import Sequelize from "sequelize";

export interface productTypings {
  define: any;
  id: number;
  name: string;
  price: number;
  description: string;
  type: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productModel = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof import("sequelize/types/data-types")
) => {
  return sequelize.define("products", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        customValidator(value: string) {
          if (value === null) {
            throw new Error("name can't be null unless age is 10");
          }
        }
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
};

export default productModel;
