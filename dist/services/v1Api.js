"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("express").Router();
const user_route_1 = __importDefault(require("../routes/user.route"));
const products_route_1 = __importDefault(require("../routes/products.route"));
const admin_route_1 = __importDefault(require("../routes/admin.route"));
const cart_route_1 = __importDefault(require("../routes/cart.route"));
// user routes
api.use("/v1", user_route_1.default);
// products routes
api.use("/v1", products_route_1.default);
// admin routes
api.use("/v1", admin_route_1.default);
// cart routes
api.use("/v1", cart_route_1.default);
exports.default = api;
