"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authToken_1 = __importDefault(require("../middleware/authToken"));
const cart_controllers_1 = require("../ModelsControllers/cart/cart.controllers");
const router = express_1.default.Router();
router.post("/add_product_to_cart/:userId", authToken_1.default, cart_controllers_1.createProductsCart);
router.get("/get_user_cartItems/:userId", authToken_1.default, cart_controllers_1.getCartProducts);
router.delete("/delete_cart_item/:userId", authToken_1.default, cart_controllers_1.deleteCartProduct);
router.patch("/increment_product_cartItem/:userId", authToken_1.default, cart_controllers_1.incrementCartItems);
router.patch("/decrement_product_cartItem/:userId", authToken_1.default, cart_controllers_1.decrementCartItems);
exports.default = router;
