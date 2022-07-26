"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cachError_1 = require("./cachError");
exports.default = (req, res, next) => {
    var _a;
    try {
        let decode;
        const token = (_a = req.get("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token) {
            decode = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
        }
        if (!token || !decode) {
            (0, cachError_1.throwError)("Invalid token", 401);
        }
        req.id = decode === null || decode === void 0 ? void 0 : decode.id;
        next();
    }
    catch (error) {
        const errorResponse = new Error("Not authorized");
        errorResponse.statusCode = 401;
        next(errorResponse);
    }
};
