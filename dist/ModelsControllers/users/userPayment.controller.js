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
exports.updateUserPayment = exports.createUserPayment = void 0;
const userPayment_model_1 = __importDefault(require("./userPayment.model"));
const createUserPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const payment_type = req.body.payment_type;
        const card_number = req.body.card_number;
        const card_expiry_date = req.body.card_expiry_date;
        const card_cvv = req.body.card_cvv;
        const card_holder_name = req.body.card_holder_name;
        if (!userId) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        const findUser = yield userPayment_model_1.default.findOne({
            where: {
                userId: userId,
            },
        });
        if (findUser) {
            const error = new Error("This card already exist on this user");
            error.statusCode = 404;
            throw error;
        }
        const createUserPayment = yield userPayment_model_1.default.create({
            userId: userId,
            payment_type: payment_type,
            card_number: card_number,
            card_expiry_date: card_expiry_date,
            card_cvv: card_cvv,
            card_holder_name: card_holder_name,
        });
        res.status(201).json({ createUserPayment });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.createUserPayment = createUserPayment;
const updateUserPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const payment_type = req.body.payment_type;
        const card_number = req.body.card_number;
        const card_expiry_date = req.body.card_expiry_date;
        const card_cvv = req.body.card_cvv;
        const card_holder_name = req.body.card_holder_name;
        if (!userId) {
            const error = new Error("User with provided not found or empty user id was provided");
            error.statusCode = 404;
            throw error;
        }
        const updateUserCard = yield userPayment_model_1.default.update({
            payment_type: payment_type,
            card_number: card_number,
            card_expiry_date: card_expiry_date,
            card_cvv: card_cvv,
            card_holder_name: card_holder_name,
            userId: userId,
        }, {
            where: {
                userId: userId,
            },
        });
        res.status(201).json({
            updateUserCard,
            message: "card details updated successfully",
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 422;
        }
        next(err);
    }
});
exports.updateUserPayment = updateUserPayment;
