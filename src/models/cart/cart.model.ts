import Sequelize from "sequelize";

const productCart = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof import("sequelize/types/data-types")
) => {
  return sequelize.define("productCart", {
    cartId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        customValidator: (name: any) => {
          if (!name.length) {
            const error: any = new Error("userId is required");
            error.statusCode = 422;
            throw error;
          }
        },
      },
    },
    productId: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        customValidator: (name: any) => {
          if (!name.length) {
            const error: any = new Error("productId is required");
            error.statusCode = 422;
            throw error;
          }
        },
      },
    },
  });
};

export default productCart;
