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
const fs = require('fs');
const path = require('path');
const cachError_1 = require("../../middleware/cachError");
const models_1 = require("../../models");
const createProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let imageUrl = req.body.image;
    try {
        if (!req.body.adminId) {
            (0, cachError_1.throwError)("admin is not found", 404);
        }
        const products = yield models_1.db.products.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            type: req.body.type,
            image: req.body.image,
            adminId: req.body.adminId,
            productAvailable: req.body.productAvailable
        });
        res.status(201).json({ message: "Product created successfully", products });
    }
    catch (error) {
        if (imageUrl) {
            console.log(imageUrl);
        }
        clearImage(imageUrl);
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
                adminId: req.query.adminId
            }
        });
        if (!products) {
            (0, cachError_1.throwError)("Products not found", 404);
        }
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
const clearImage = (filePath) => {
    filePath = path.join(__dirname, "../../../", filePath);
    fs.unlink(filePath, (err) => console.log(err));
};
