"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const adminModel = (sequelise, Datatypes) => {
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
                customValidator(value) {
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
    });
    return Admin;
};
exports.default = adminModel;
