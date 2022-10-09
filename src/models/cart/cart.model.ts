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
  });
};

export default productCart;
