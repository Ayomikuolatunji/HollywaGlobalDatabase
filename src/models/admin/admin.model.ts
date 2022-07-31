import { throwError } from "../../middleware/cachError";

const { Sequelize } = require('sequelize');


const adminModel = (sequelise: any, Datatypes: any) => {
    const Admin = sequelise.define('admin', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        username: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Datatypes.STRING,
            allowNull: true,
            validate: {
                customValidator(value:string) {
                  if (value === null) {
                    throw new Error("name can't be null unless age is 10");
                  }
                }
              }
        },
        createdAt: {
            type: Datatypes.DATE,
            allowNull: false,
            defaultValue: Datatypes.NOW
        },
        updatedAt: {
            type: Datatypes.DATE,
            allowNull: false,
            defaultValue: Datatypes.NOW
        }
    })

    return Admin;
}


export default adminModel;