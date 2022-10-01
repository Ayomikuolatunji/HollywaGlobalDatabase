import Sequelize from "sequelize";

const productsDepartments = (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof import("sequelize/types/data-types")
) => {
  return sequelize.define("productsDepartments", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
    },
    name: {
      type: DataTypes.STRING,
      allowNull:true,
      validate: {
        customValidator(value: string) {
          if (!value) {
            throw new Error("Cant submit empty name to the db");
          }
        }
      },
    },
    createdAt: {
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW
    }
  });
};

export default productsDepartments;
