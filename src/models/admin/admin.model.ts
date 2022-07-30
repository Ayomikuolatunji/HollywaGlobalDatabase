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
            // write my  custom validation here to check if password is at least 8 characters long
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