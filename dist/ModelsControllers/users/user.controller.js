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
exports.deleteUser = exports.restPassword = exports.updateUserEmail = exports.updateUserName = exports.getUser = exports.getUsers = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../../helpers/utils");
const cacheError_1 = require("../../middleware/cacheError");
const user_model_1 = __importDefault(require("./user.model"));
const http_status_codes_1 = require("http-status-codes");
dotenv_1.default.config();
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const first_name = req.body.first_name;
        const email = req.body.email;
        const password = req.body.password;
        const last_name = req.body.last_name;
        const findUser = yield user_model_1.default.findOne({ email: email });
        if (findUser) {
            {
                (0, cacheError_1.throwError)("user account already exits", http_status_codes_1.StatusCodes.CONFLICT);
            }
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        const user = new user_model_1.default({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });
        const createUser = yield user.save();
        res.status(201).json({
            message: "user account created successfully",
            user: (0, utils_1.getMutatedMomgooseField)(createUser === null || createUser === void 0 ? void 0 : createUser._doc),
        });
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
        const findUser = yield user_model_1.default.findOne({ email: email });
        const passwordCorrect = yield bcrypt_1.default.compare(password, findUser.password);
        if (!passwordCorrect) {
            (0, cacheError_1.throwError)("Invalid password", 401);
        }
        const token = jsonwebtoken_1.default.sign({
            email: findUser.email,
            id: findUser._id,
        }, `${process.env.JWT_SECRET}`, { expiresIn: "30d" });
        res.status(200).json({
            message: "user logged in successfully",
            token,
            userId: findUser._id,
        });
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
        const allusers = yield user_model_1.default.find({});
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
        const userId = req.query.userId;
        const findUser = yield user_model_1.default.findOne({ _id: userId });
        if (!userId) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: "User data fetched successfully",
            data: (0, utils_1.getMutatedMomgooseField)(findUser._doc),
        });
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
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        const findUser = yield user_model_1.default.findOne({
            where: {
                userId: userId,
            },
        });
        if (!findUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        const updateuserName = yield user_model_1.default.updateOne({
            username: username,
        }, {
            where: {
                userId: userId,
            },
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
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        const findUser = yield user_model_1.default.findOne({
            where: {
                userId: userId,
            },
        });
        if (!findUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        const updateEmail = yield user_model_1.default.updateOne({
            email: email,
        }, {
            where: {
                userId: userId,
            },
        });
        res.status(200).json({
            updateEmail: updateEmail,
            message: "Email updated successfully",
        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.updateUserEmail = updateUserEmail;
const restPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.restPassword = restPassword;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteUser = deleteUser;
