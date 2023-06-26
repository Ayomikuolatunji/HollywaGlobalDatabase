"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authToken_1 = __importDefault(require("../middleware/authToken"));
const router = express_1.default.Router();
const product_controller_1 = require("../ModelsControllers/products/product.controller");
// unprotected routes
router.get("/all_department", product_controller_1.getAllProductsDepartments);
// protected routes
router.delete("/products/delete_many", authToken_1.default, product_controller_1.bulkyDeleteFunction);
router.get("/products", authToken_1.default, product_controller_1.getProducts);
router.get("/user_products", product_controller_1.getUserProducts);
router.get("/user_product/:productId", product_controller_1.getUserSingleProduct);
router.get("/products/:productId", authToken_1.default, product_controller_1.getProduct);
router.post("/products", authToken_1.default, product_controller_1.createProducts);
router.delete("/products/:productId", authToken_1.default, product_controller_1.deleteProduct);
router.patch("/products/product_status", authToken_1.default, product_controller_1.changeProductStatus);
router.patch("/products/:productId", authToken_1.default, product_controller_1.editProduct);
router.post("/create_products_departments", authToken_1.default, product_controller_1.createProductsDepartments);
exports.default = router;
