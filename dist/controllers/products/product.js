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
exports.getProduct = exports.editProduct = exports.changeProductStatus = exports.deleteProduct = exports.getProducts = exports.createProducts = void 0;
const fs = require("fs");
const path = require("path");
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
            description: req.body.description.trim(),
            type: req.body.type || "general",
            image: req.body.image,
            adminId: req.body.adminId,
            status: req.body.status,
            currency: req.body.currency,
        });
        res.status(201).json({ message: "Product created successfully", products });
    }
    catch (error) {
        clearImage(imageUrl || "");
        next(error);
    }
});
exports.createProducts = createProducts;
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield models_1.db.products.findAll({
            where: {
                adminId: req.query.adminId,
            },
        });
        if (!products) {
            (0, cachError_1.throwError)("Products not found", 404);
        }
        res
            .status(200)
            .json({ message: "Products retrieved successfully", products });
    }
    catch (error) {
        next(error);
    }
});
exports.getProducts = getProducts;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const adminId = req.query.adminId;
        // remove image from folder
        const productImage = yield models_1.db.products.findOne({
            where: {
                id: productId,
                adminId: adminId,
            },
        });
        if (!productImage) {
            (0, cachError_1.throwError)("Product not found", 404);
        }
        clearImage(productImage.image);
        yield models_1.db.products.destroy({
            where: {
                id: productId,
                adminId: adminId,
            },
        });
        res
            .status(200)
            .json({ message: "Product deleted successfully", productImage });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProduct = deleteProduct;
const changeProductStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productIds = req.body.productIds;
        const adminId = req.query.adminId;
        const statuses = req.body.status;
        const product = yield models_1.db.products.findAll({
            where: {
                adminId: adminId,
            },
        });
        if (!product) {
            (0, cachError_1.throwError)("Product not found with adminId provided", 404);
        }
        // update using products ids of the admin and status  array
        const updateProduct = statuses.map((status, i) => {
            return models_1.db.products.update({
                status: status,
            }, {
                where: {
                    id: productIds[i],
                },
            });
        });
        yield Promise.all(updateProduct);
        res
            .status(200)
            .json({ message: "Product status changed successfully", product });
    }
    catch (error) {
        next(error);
    }
});
exports.changeProductStatus = changeProductStatus;
const editProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let imageUrl = req.body.image;
    try {
        const productId = req.params.productId;
        const adminId = req.query.adminId;
        const product = yield models_1.db.products.findOne({
            where: {
                id: productId,
                adminId: adminId,
            },
        });
        if (!product) {
            (0, cachError_1.throwError)("Product not found with adminId provided", 404);
        }
        if (product) {
            clearImage(product === null || product === void 0 ? void 0 : product.dataValues.image);
        }
        const updatedProduct = yield models_1.db.products.update({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description.trim(),
            type: req.body.type || "general",
            image: req.body.image,
            adminId: req.body.adminId,
            status: req.body.status,
            currency: req.body.currency,
        }, {
            where: {
                id: productId,
                adminId: adminId,
            },
        });
        res
            .status(200)
            .json({ message: "Product updated successfully", updatedProduct });
    }
    catch (error) {
        clearImage(imageUrl || "");
        next(error);
    }
});
exports.editProduct = editProduct;
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const adminId = req.query.adminId;
        const product = yield models_1.db.products.findOne({
            where: {
                id: productId,
                adminId: adminId,
            },
        });
        if (!product) {
            (0, cachError_1.throwError)("Product not found with adminId provided", 404);
        }
        res
            .status(200)
            .json({ message: "Product retrieved successfully", product });
    }
    catch (error) {
        next(error);
    }
});
exports.getProduct = getProduct;
const clearImage = (filePath) => {
    filePath = path.join(__dirname, "../../../", filePath);
    fs.unlink(filePath, (err) => console.log(err));
};
