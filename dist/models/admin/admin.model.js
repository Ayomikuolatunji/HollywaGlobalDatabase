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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cachError_1 = require("../../middleware/cachError");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
            allowNull: true,
            unique: true,
            validate: {
                customValidator: (email) => __awaiter(void 0, void 0, void 0, function* () {
                    //  allow only email format
                    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                        (0, cachError_1.throwError)("Please provide a valid email", 422);
                    }
                })
            }
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
            },
            set value(value) {
                adminModel.prototype.setDataValue("password", bcrypt_1.default.hashSync(value, bcrypt_1.default.genSaltSync()));
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
