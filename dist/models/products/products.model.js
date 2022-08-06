"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const productModel = (sequelize, DataTypes) => {
    return sequelize.define("products", {
        id: {
            type: sequelize_1.default.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.default.UUIDV1,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                customValidator(value) {
                    if (value === null) {
                        throw new Error("name can't be null unless age is 10");
                    }
                }
            },
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productAvailable: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
};
exports.default = productModel;
