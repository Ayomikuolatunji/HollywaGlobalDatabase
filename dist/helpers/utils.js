"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMutatedMomgooseField = void 0;
const getMutatedMomgooseField = (field) => {
    const newField = Object.assign({}, field);
    delete newField.password;
    return newField;
};
exports.getMutatedMomgooseField = getMutatedMomgooseField;
