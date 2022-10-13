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
    productIds: {
      type: DataTypes.STRING, 
      get: function() {
          return JSON.parse(this.getDataValue('productId'));
      }, 
      set: function(val) {
          return this.setDataValue('productId', JSON.stringify(val));
      }
    },
  });
};

export default productCart;
