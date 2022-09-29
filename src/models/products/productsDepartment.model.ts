import Sequelize from "sequelize";

const productsDepartments = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof import("sequelize/types/data-types")
) => {
  return sequelize.define("productsDepartments", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
    },
    name: {
      type: Sequelize.STRING,
      primaryKey: true,
      validate: {
        customValidator(value: string) {
          if (!value) {
            throw new Error("Cant submit empty name to the db");
          }
        }
      },
    },
  });
};

export default productsDepartments;
