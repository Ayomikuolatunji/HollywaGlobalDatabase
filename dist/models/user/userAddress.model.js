"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userAddressModel = (sequelise, datatypes) => {
    return sequelise.define('userAddress', {
        id: {
            type: datatypes.UUID,
            primaryKey: true,
            defaultValue: datatypes.UUIDV1
        },
        address_line1: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (address_line1) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!address_line1) {
                        throw new Error("Please provide your address line 1");
                    }
                })
            }
        },
        address_line2: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (address_line2) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!address_line2) {
                        throw new Error("Please provide your address line 2");
                    }
                })
            }
        },
        city: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (city) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!city) {
                        throw new Error("Please provide your city");
                    }
                })
            }
        },
        postal_code: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (postal_code) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!postal_code) {
                        throw new Error("Please provide your postal code");
                    }
                })
            }
        },
        country: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (country) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!country) {
                        throw new Error("Please provide your country");
                    }
                })
            }
        },
        telephone: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (telephone) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!telephone) {
                        throw new Error("Please provide your telephone");
                    }
                })
            }
        },
        createdAt: {
            type: datatypes.DATE,
            allowNull: false,
            defaultValue: datatypes.NOW
        },
        updatedAt: {
            type: datatypes.DATE,
            allowNull: false,
            defaultValue: datatypes.NOW
        }
    });
};
exports.default = userAddressModel;
