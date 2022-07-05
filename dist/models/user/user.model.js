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
const sequelize_1 = __importDefault(require("sequelize"));
const userModel = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        userId: {
            type: sequelize_1.default.UUID,
            defaultValue: sequelize_1.default.UUIDV1,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (name) => {
                    if (!name.length) {
                        const error = new Error('Name is required');
                        error.statusCode = 422;
                        throw error;
                    }
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                customValidator: (email) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!email) {
                        throw new Error("Please provide your email");
                    }
                })
            },
            unique: {
                name: 'email already exits',
                msg: "User already exists with this email"
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (first_name) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!first_name) {
                        throw new Error("Please provide your first name");
                    }
                })
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (last_name) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!last_name) {
                        throw new Error("Please provide your last name");
                    }
                })
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (password) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!password) {
                        throw new Error("Please provide your password");
                    }
                })
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "customer",
        },
        user_profile_image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "https://res.cloudinary.com/dzqbzqgjy/image/upload/v1599098981/default_profile_image_qjqjqj.png"
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
};
exports.default = userModel;
