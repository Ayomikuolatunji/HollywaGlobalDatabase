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
const models_1 = require("../../models");
const createAdress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if user already has an adress using userid
        const findUser = yield models_1.db.userAddressModel.findOne({
            where: {
                userId: req.body.userId
            }
        });
        if (findUser) {
            const error = new Error('User already has an adress');
            error.statusCode = 404;
            throw error;
        }
        const address_line1 = req.body.address_line1;
        const address_line2 = req.body.address_line2;
        const city = req.body.city;
        const postal_code = req.body.postal_code;
        const country = req.body.country;
        const telephone = req.body.telephone;
        const userAdress = yield models_1.db.userAddressModel.create({
            address_line1,
            address_line2,
            city,
            postal_code,
            country,
            telephone,
            userId: req.body.userId
        });
        res.status(201).json({ userAdress, message: "Address created successfully" });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
const getUserAdress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if user already has an adress using userid
        const findUser = yield models_1.db.userAddressModel.findOne({
            where: {
                userId: req.params.userId
            }
        });
        if (!findUser) {
            const error = new Error('User does not have an adress');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ findUser });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
const updateUserAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address_line1 = req.body.address_line1;
        const address_line2 = req.body.address_line2;
        const city = req.body.city;
        const postal_code = req.body.postal_code;
        const country = req.body.country;
        const telephone = req.body.telephone;
        const updateUserAddress = yield models_1.db.userAddressModel.update({
            address_line1,
            address_line2,
            city,
            postal_code,
            country,
            telephone,
            userId: req.params.userId
        }, {
            where: {
                userId: req.params.userId,
            }
        });
        res.status(200).json({ updateUserAddress, message: "Address updated successfully" });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
module.exports = {
    createAdress,
    getUserAdress,
    updateUserAddress
};
