"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api = require('express').Router();
const user_route_1 = __importDefault(require("../routes/user.route"));
// user routes
api.use("/v1", user_route_1.default);
exports.default = api;
