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
exports.getProducts = exports.createProducts = void 0;
const cachError_1 = require("../../middleware/cachError");
const models_1 = require("../../models");
const createProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.file) {
            (0, cachError_1.throwError)("No image provided", 400);
        }
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const products = yield models_1.db.products.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            type: req.body.type,
            image: image,
            adminId: req.body.adminid
        });
        res.status(201).json({ message: "Product created successfully", products });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.createProducts = createProducts;
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield models_1.db.products.findAll({
            where: {
                adminId: req.body.adminid
            }
        });
        res.status(200).json({ message: "Products retrieved successfully", products });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.getProducts = getProducts;
