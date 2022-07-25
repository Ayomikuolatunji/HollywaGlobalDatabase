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
exports.deleteUser = exports.updateUserEmail = exports.updateUserName = exports.getUser = exports.getUsers = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../../models");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        yield models_1.db.user.create({
            username,
            first_name,
            last_name,
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: "user account created successfully" });
    }
    catch (error) {
        console.log(error.message);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const findUser = yield models_1.db.user.findOne({
            where: {
                email: email
            }
        });
        const passwordCorrect = yield bcrypt_1.default.compare(password, findUser.password);
        if (!passwordCorrect) {
            throw new Error('Invalid credentials');
        }
        const token = jsonwebtoken_1.default.sign({
            email: findUser.email,
            userId: findUser.userId
        }, `${process.env.JWT_SECRET}`, { expiresIn: '30d' });
        res.status(200).json({ message: "user logged in successfully", token });
    }
    catch (error) {
        console.log(error.message);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allusers = yield models_1.db.user.findAll({});
        res.status(200).json({ allusers });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const findUser = yield models_1.db.user.findOne({
            where: {
                userId: userId
            }
        });
        if (!userId) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ findUser });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.getUser = getUser;
const updateUserName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const username = req.body.username;
        if (!userId) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const findUser = yield models_1.db.user.findOne({
            where: {
                userId: userId
            }
        });
        if (!findUser) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const updateuserName = yield models_1.db.user.update({
            username: username
        }, {
            where: {
                userId: userId,
            }
        });
        res.status(200).json({ updateuserName });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.updateUserName = updateUserName;
const updateUserEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const email = req.body.email;
        if (!userId) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const findUser = yield models_1.db.user.findOne({
            where: {
                userId: userId
            }
        });
        if (!findUser) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const updateEmail = yield models_1.db.user.update({
            email: email
        }, {
            where: {
                userId: userId,
            }
        });
        res.status(200).json({ updateEmail: updateEmail, message: "Email updated successfully" });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.updateUserEmail = updateUserEmail;
const restPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteUser = deleteUser;
