import sequelize from "sequelize";

const productCart = (
  Sequelize: sequelize.Sequelize,
  DataTypes: typeof import("sequelize/types/data-types")
) => {
  return Sequelize.define("productCart", {
     
  });
};


export default productCart
