"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authToken_1 = __importDefault(require("../middleware/authToken"));
const router = express_1.default.Router();
const product_1 = require("../controllers/products/product");
router.get("/products", authToken_1.default, product_1.getProducts);
router.post("/products", product_1.createProducts);
exports.default = router;
