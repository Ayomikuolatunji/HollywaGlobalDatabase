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
exports.getUserProducts = exports.getAllProductsDepartments = exports.createProductsDepartments = exports.bulkyDeleteFunction = exports.getProduct = exports.editProduct = exports.changeProductStatus = exports.deleteProduct = exports.getProducts = exports.createProducts = exports.getUserSingleProduct = void 0;
const http_status_codes_1 = require("http-status-codes");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cacheError_1 = require("../../middleware/cacheError");
const product_model_1 = __importDefault(require("./product.model"));
const createProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let imageUrl = req.body.image;
    try {
        if (!req.body.adminId) {
            (0, cacheError_1.throwError)("admin is not found", 404);
        }
        const products = new product_model_1.default({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description.trim(),
            type: req.body.type || "general",
            image: req.body.image,
            adminId: req.body.adminId,
            status: req.body.status,
            currency: req.body.currency,
        });
        yield products.save();
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
        const adminId = req.query.adminId;
        if (!adminId)
            (0, cacheError_1.throwError)("adminId not passed to the query params", http_status_codes_1.StatusCodes.NOT_FOUND);
        const products = yield product_model_1.default.find({ adminId }).exec();
        if (!products) {
            (0, cacheError_1.throwError)("Products not found", 404);
        }
        res.status(200).json({
            message: "Products retrieved successfully",
            products: products.sort((a, b) => b.createdAt - a.createdAt),
            count: products.length,
        });
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
        const productImage = yield product_model_1.default
            .findOne({ _id: productId, adminId: adminId })
            .exec();
        if (!productImage) {
            (0, cacheError_1.throwError)("Product not found", 404);
        }
        clearImage(productImage.image);
        yield product_model_1.default.deleteOne({
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
        const product = yield product_model_1.default.find({ adminId: adminId });
        if (!product) {
            (0, cacheError_1.throwError)("Product not found with adminId provided", 404);
        }
        // update using products ids of the admin and status  array
        const updateProduct = statuses.map((status, i) => {
            return product_model_1.default.updateMany({ _id: productIds[i] }, { status: status }, {
                upsert: true,
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
        const product = yield product_model_1.default.findOne({
            _id: productId,
            adminId: adminId,
        });
        if (!product) {
            (0, cacheError_1.throwError)("Product not found with adminId provided", 404);
        }
        if (product) {
            if (product.image !== req.body.image) {
                clearImage(product === null || product === void 0 ? void 0 : product.dataValues.image);
            }
        }
        const updatedProduct = yield product_model_1.default.updateOne({ id: productId, adminId: adminId, name: req.body.name }, {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description.trim(),
            type: req.body.type || "general",
            image: req.body.image,
            adminId: req.body.adminId,
            status: req.body.status,
            currency: req.body.currency,
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
        const product = yield product_model_1.default.findOne({ _id: productId, adminId });
        if (!product) {
            (0, cacheError_1.throwError)("Product not found with adminId provided", 404);
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
const getUserProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fieldType = req.query.product_type;
        if (fieldType === "all") {
            const products = yield product_model_1.default
                .find({})
                .sort({ field: "desc", test: -1 });
            if (!products) {
                (0, cacheError_1.throwError)("Products not found with adminId provided", 404);
            }
            res.status(200).json({
                message: "Product retrieved successfully",
                products: products,
                count: products.length,
            });
        }
        else if (fieldType !== "all") {
            const products = yield product_model_1.default
                .find({ type: fieldType })
                .sort({ field: "desc", test: -1 });
            if (!products.length) {
                (0, cacheError_1.throwError)("query key is invalid", http_status_codes_1.StatusCodes.NOT_FOUND);
                return;
            }
            res.status(http_status_codes_1.StatusCodes.OK).json({
                products,
                message: "Product retrieved successfully",
                count: products.length,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getUserProducts = getUserProducts;
const getUserSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const product = yield product_model_1.default.findOne({ _id: productId });
        if (!product) {
            (0, cacheError_1.throwError)("Product not found with id provided", 404);
        }
        res
            .status(200)
            .json({ message: "Product retrieved successfully", product });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserSingleProduct = getUserSingleProduct;
const bulkyDeleteFunction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productIds = req.body.productIds;
        const adminId = req.query.adminId;
        // find admin products
        const adminProducts = yield product_model_1.default.find({ adminId: adminId });
        if (!adminProducts) {
            (0, cacheError_1.throwError)("Admin can't delete products", 404);
        }
        const findAllProducts = productIds.map((id) => {
            return product_model_1.default.findOne({ _id: id, adminId: adminId });
        });
        yield (yield Promise.all(findAllProducts)).map((product) => {
            clearImage(product === null || product === void 0 ? void 0 : product.image);
        });
        // destroy bulky products
        const destroyBulkyProducts = productIds.map((id) => {
            return product_model_1.default.deleteOne({ _id: id, adminId: adminId });
        });
        const sendDestroyedproduct = yield Promise.all(destroyBulkyProducts);
        res.status(200).json({
            message: "Bulky deleted successfully",
            destroyBulkyProducts: sendDestroyedproduct,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.bulkyDeleteFunction = bulkyDeleteFunction;
const createProductsDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.query.adminId;
        const findDepartment = yield product_model_1.default.findOne({
            where: {
                name: req.body.name,
            },
        });
        if (findDepartment) {
            (0, cacheError_1.throwError)("Department already exits", 422);
        }
        const departments = new product_model_1.default({
            name: req.body.name,
            adminId: adminId,
        });
        yield departments.save();
        return res
            .status(201)
            .json({ message: "Departments created successfully", departments });
    }
    catch (error) {
        next(error);
    }
});
exports.createProductsDepartments = createProductsDepartments;
const getAllProductsDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAll = yield product_model_1.default.find({});
        res.status(200).json({
            message: "All available departments fetched successfully",
            departments: getAll,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllProductsDepartments = getAllProductsDepartments;
const clearImage = (filePath) => {
    filePath = path_1.default.join(__dirname, "../../../", filePath);
    fs_1.default.unlink(filePath, (err) => console.log(err));
};
