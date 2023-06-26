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
exports.deleteCartProduct = exports.getCartProducts = exports.decrementCartItems = exports.incrementCartItems = exports.createProductsCart = void 0;
const http_status_codes_1 = require("http-status-codes");
const cacheError_1 = require("../../middleware/cacheError");
const cart_model_1 = __importDefault(require("./cart.model"));
const product_model_1 = __importDefault(require("../products/product.model"));
const createProductsCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.query.productId;
        const userId = req.params.userId;
        if (!productId || !userId)
            (0, cacheError_1.throwError)("Invalid params or query id", http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
        const findCartProduct = yield cart_model_1.default.findOne({
            productId: productId,
        });
        const findProduct = yield product_model_1.default.findOne({ _id: productId });
        if (!findCartProduct) {
            const queryProduct = new cart_model_1.default({
                productId: productId,
                userId: userId,
                totalAmount: findProduct.price,
            });
            let creatCartItem = yield queryProduct.save();
            yield product_model_1.default.updateOne({ _id: productId }, { item_in_cart: true });
            res.status(201).json({
                message: "Product added to cart successfully",
                cartItems: creatCartItem,
            });
        }
        else {
            (0, cacheError_1.throwError)("Item added already, increment only", http_status_codes_1.StatusCodes.CONFLICT);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createProductsCart = createProductsCart;
const incrementCartItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.query.productId;
        const userId = req.params.userId;
        if (!productId || !userId)
            (0, cacheError_1.throwError)("Invalid params or query id", http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
        const findProduct = yield cart_model_1.default
            .findOne({
            productId: productId,
        })
            .populate("productId")
            .exec();
        if (!findProduct)
            (0, cacheError_1.throwError)("CartItem not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        if (productId && findProduct) {
            let newAmount = +findProduct.productId.price;
            newAmount += +findProduct.totalAmount;
            yield cart_model_1.default.updateOne({ productId: productId, userId: userId }, {
                productCount: +(findProduct.productCount + 1),
                totalAmount: newAmount,
            });
        }
        res.status(200).json({ message: "Incremented successfully by 1" });
    }
    catch (error) {
        next(error);
    }
});
exports.incrementCartItems = incrementCartItems;
const decrementCartItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.query.productId;
        const userId = req.params.userId;
        if (!productId || !userId)
            (0, cacheError_1.throwError)("Invalid params or query id", http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
        const findProduct = yield cart_model_1.default
            .findOne({
            productId: productId,
        })
            .populate("productId")
            .exec();
        if (!findProduct)
            (0, cacheError_1.throwError)("CartItem not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        if (productId && findProduct) {
            let newAmount = parseInt(findProduct.totalAmount) -
                parseInt(findProduct.productId.price);
            yield cart_model_1.default.updateOne({ productId: productId, userId: userId }, {
                productCount: +(findProduct.productCount - 1),
                totalAmount: newAmount,
            });
        }
        res.status(200).json({ message: "Decrement successfully by 1" });
    }
    catch (error) {
        next(error);
    }
});
exports.decrementCartItems = decrementCartItems;
const getCartProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = req.params.userId;
        if (!findUser)
            (0, cacheError_1.throwError)("Please ", http_status_codes_1.StatusCodes.NOT_FOUND);
        const findUserCartItems = yield cart_model_1.default
            .find({ userId: findUser })
            .populate("productId")
            .exec();
        if (!findUserCartItems)
            (0, cacheError_1.throwError)("User not found or invalid id was passed", http_status_codes_1.StatusCodes.NOT_FOUND);
        let userTotalProductAmounts = [];
        findUserCartItems.forEach((ele) => {
            userTotalProductAmounts.push(ele.totalAmount);
        });
        let totalSuccessfulCartItems = userTotalProductAmounts.reduce((rev, cal) => {
            return rev + cal / 100;
        }, 0);
        res.status(200).json({
            message: "cartItems fetched successfully",
            cartItems: findUserCartItems,
            totalAmounts: Math.ceil(totalSuccessfulCartItems),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCartProducts = getCartProducts;
const deleteCartProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findCartId = req.query.cartId;
        const productId = req.query.productId;
        const findUserId = req.params.userId;
        if (!findCartId || !findUserId)
            (0, cacheError_1.throwError)("You are not allowed to delete to cart", http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
        const findcartItem = yield cart_model_1.default.findOneAndDelete({
            _id: findCartId,
            userId: findUserId,
        });
        yield product_model_1.default.updateOne({ _id: productId }, { item_in_cart: false });
        res.status(200).json({
            message: "Item deleted successfully",
            cartItem: findcartItem,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCartProduct = deleteCartProduct;
