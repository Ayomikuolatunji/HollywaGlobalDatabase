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
exports.getAdmin = exports.signInAdmin = exports.createAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../../helpers/utils");
const cacheError_1 = require("../../middleware/cacheError");
const model_admin_1 = __importDefault(require("./model.admin"));
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = req.body.password;
        const username = req.body.username;
        const email = req.body.email;
        if (!password || !username || !email) {
            (0, cacheError_1.throwError)("Please fill all the fields", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const findAdmin = yield model_admin_1.default.findOne({ email: email });
        if (findAdmin) {
            (0, cacheError_1.throwError)("admin already exits", http_status_codes_1.StatusCodes.CONFLICT);
        }
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const admin = new model_admin_1.default({
            username,
            email,
            password: hashedPassword,
        });
        yield admin.save();
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
        const loginAdmin = yield model_admin_1.default.findOne({
            email: email,
        });
        if (!loginAdmin) {
            (0, cacheError_1.throwError)("Admin not found with the email provided", 404);
        }
        else {
            const comparePassword = yield bcrypt_1.default.compare(password, loginAdmin.password);
            if (!comparePassword) {
                throw new Error("Invalid password");
            }
            const token = jsonwebtoken_1.default.sign({
                email: loginAdmin.email,
                id: loginAdmin._id,
            }, `${process.env.JWT_SECRET}`, { expiresIn: "30 days" });
            res.status(200).json({
                message: "Admin logged in successfully",
                token,
                adminId: loginAdmin._id,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.signInAdmin = signInAdmin;
const getAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.params.adminId;
        if (!adminId) {
            (0, cacheError_1.throwError)("Admin id is not found", 404);
        }
        const findAdmin = yield model_admin_1.default
            .findOne({ _id: adminId })
            .exec();
        if (!findAdmin)
            (0, cacheError_1.throwError)("Admin not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        res.status(200).json({
            adminid: findAdmin._id,
            message: "Admin fetch successfully",
            profileData: (0, utils_1.getMutatedMomgooseField)(findAdmin._doc),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAdmin = getAdmin;
