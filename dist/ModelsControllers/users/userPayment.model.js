"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userPaymentModel = new mongoose_1.default.Schema({
    userId: {
        type: String,
        require: true,
    },
    payment_type: {
        type: String,
        require: true,
    },
    card_number: {
        type: Number,
        require: true,
    },
    card_expiry_date: {
        type: Date,
        require: true,
    },
    card_cvv: {
        type: Number,
        require: true,
    },
    card_holder_name: {
        type: String,
        require: true,
    },
});
exports.default = mongoose_1.default.model("userPaymentCardSchema", userPaymentModel);
