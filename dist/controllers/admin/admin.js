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
const cachError_1 = require("../../middleware/cachError");
const models_1 = require("../../models");
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = req.body.password;
        const username = req.body.username;
        const email = req.body.email;
        if (!password || !username || !email) {
            (0, cachError_1.throwError)("Please fill all the fields", 400);
        }
        yield models_1.db.admin.create({
            username,
            email,
            password: password
        });
        res.status(201).json({ message: "Admin created successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.createAdmin = createAdmin;
const signInAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const loginAdmin = yield models_1.db.admin.findOne({
            where: {
                email: email
            }
        });
        if (!loginAdmin) {
            (0, cachError_1.throwError)("Admin not found with the email provided", 404);
        }
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
        next(error);
    }
});
exports.signInAdmin = signInAdmin;
const oneAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.params.adminId;
        if (!adminId) {
            (0, cachError_1.throwError)("Admin id is not found", 404);
        }
        const findAdmin = yield models_1.db.admin.findOne({
            where: {
                id: adminId
            }
        });
        res.status(200).json({ adminid: findAdmin.id, message: "Admin fetch successfully" });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.oneAdmin = oneAdmin;
