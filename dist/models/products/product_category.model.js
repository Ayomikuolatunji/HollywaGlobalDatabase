"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const produtCategory = (sequelize, DataTypes) => {
    return sequelize.define('product_category', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    });
};
exports.default = produtCategory;
