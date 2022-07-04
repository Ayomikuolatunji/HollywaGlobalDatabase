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
const moment_1 = __importDefault(require("moment"));
const userPaymentModel = (sequelize, datatypes) => {
    return sequelize.define("userPayment", {
        id: {
            type: datatypes.UUID,
            primaryKey: true,
            defaultValue: datatypes.UUIDV1
        },
        payment_type: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (payment_type) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!payment_type) {
                        throw new Error("Please provide your payment type");
                    }
                    else if (payment_type !== 'credit' && payment_type !== 'debit') {
                        throw new Error("Please provide valid payment type");
                    }
                })
            }
        },
        card_number: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (card_number) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!card_number) {
                        throw new Error("Please provide your card number");
                    }
                })
            }
        },
        card_expiry_date: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (card_expiry_date) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!card_expiry_date) {
                        throw new Error("Please provide your card expiry date");
                    }
                    else if (!(0, moment_1.default)(card_expiry_date).isValid()) {
                        throw new Error("Please provide a valid card expiry date");
                    }
                })
            }
        },
        card_cvv: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (card_cvv) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!card_cvv) {
                        throw new Error("Please provide your card cvv");
                    }
                    else if (card_cvv.length !== 3) {
                        throw new Error("Please provide your card cvv with 3 digits");
                    }
                })
            }
        },
        card_holder_name: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (card_holder_name) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!card_holder_name) {
                        throw new Error("Please provide your card holder name");
                    }
                })
            }
        },
        created_at: {
            type: datatypes.DATE,
            allowNull: false,
            defaultValue: datatypes.NOW
        },
        updated_at: {
            type: datatypes.DATE,
            allowNull: false,
            defaultValue: datatypes.NOW
        }
    });
};
exports.default = userPaymentModel;
