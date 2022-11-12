import express from "express";
import authToken from "../middleware/authToken";
import {
  createProductsCart,
  getCartProduct,
} from "../ModelsControllers/cart/cart.controllers";

const router = express.Router();

router.post("/add_product_to_cart/:userId", authToken, createProductsCart);

router.get("/get_user_cartItems/:userId", authToken, getCartProduct);

export default router;
