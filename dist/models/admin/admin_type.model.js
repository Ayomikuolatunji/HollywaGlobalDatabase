"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminType = (sequelize, DataTypes) => {
    return sequelize.define('admin_type', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        }
    });
};
exports.default = adminType;
