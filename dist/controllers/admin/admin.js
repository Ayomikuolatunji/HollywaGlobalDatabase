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
exports.oneAdmin = exports.signInAdmin = exports.createAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../../models");
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        yield models_1.db.admin.create({
            username,
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: "Admin created successfully" });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.createAdmin = createAdmin;
const signInAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const loginAdmin = yield models_1.db.admin.findOne({
            where: {
                email: email
            }
        });
        const comparePassword = yield bcrypt_1.default.compare(password, loginAdmin.password);
        if (!comparePassword) {
            throw new Error('Invalid password');
        }
        const token = jsonwebtoken_1.default.sign({
            email: loginAdmin.email,
            id: loginAdmin.adminId
        }, `${process.env.JWT_SECRET}`, { expiresIn: "30 days" });
        res.status(200).json({ message: "Admin logged in successfully", token, adminId: loginAdmin.id });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.signInAdmin = signInAdmin;
const oneAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.params;
        const findAdmin = yield models_1.db.admin.findOne({
            where: {
                adminId: adminId
            }
        });
        res.status(200).json({ adminid: findAdmin.adminId });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.oneAdmin = oneAdmin;
