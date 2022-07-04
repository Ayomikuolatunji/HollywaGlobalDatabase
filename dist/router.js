"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("./controllers/admin/admin");
const industries_1 = require("./controllers/industries/industries");
const product_1 = require("./controllers/products/product");
const router = express_1.default.Router();
// users routes ends here
// products routes
router.post("/products", product_1.createProducts);
// products routes ends here
// admin routes
router.post("/create_admin", admin_1.createAdmin);
// industries routes
router.post("/industries", industries_1.createIndustries);
exports.default = router;
