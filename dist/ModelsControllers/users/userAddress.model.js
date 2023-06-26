"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userAddressModel = new mongoose_1.default.Schema({
    address_line1: {
        type: String,
        require: true,
    },
    address_line2: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    postal_code: {
        type: Number,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    telephone: {
        type: Number,
        require: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "userSchemas",
    },
});
exports.default = mongoose_1.default.model("userAddressModel", userAddressModel);
