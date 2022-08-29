"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authToken_1 = __importDefault(require("../middleware/authToken"));
const router = express_1.default.Router();
const product_1 = require("../controllers/products/product");
// none protected route
router.delete("/products/delete_many", authToken_1.default, product_1.bulkyDeleteFunction);
// protected routes
router.get("/products", authToken_1.default, product_1.getProducts);
router.get("/products/:productId", authToken_1.default, product_1.getProduct);
router.post("/products", authToken_1.default, product_1.createProducts);
router.delete("/products/:productId", authToken_1.default, product_1.deleteProduct);
router.patch("/products/product_status", authToken_1.default, product_1.changeProductStatus);
router.patch("/products/:productId", authToken_1.default, product_1.editProduct);
exports.default = router;
