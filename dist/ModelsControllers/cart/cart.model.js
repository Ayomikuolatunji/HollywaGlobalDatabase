"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userCartItem = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ProductSchema",
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "userSchemas",
    },
    productCount: {
        type: Number,
        default: 0,
    },
    totalAmount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("userCartItems", userCartItem);
