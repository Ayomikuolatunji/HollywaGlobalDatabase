import express from "express";
import authToken from "../middleware/authToken";
import {
  createProductsCart,
  deleteCartProduct,
  getCartProducts,
  incrementCartItems,
  decrementCartItems,
} from "../ModelsControllers/cart/cart.controllers";

const router = express.Router();

router.post("/add_product_to_cart/:userId", authToken, createProductsCart);

router.get("/get_user_cartItems/:userId", authToken, getCartProducts);

router.delete("/delete_cart_item/:userId", authToken, deleteCartProduct);

router.patch(
  "/increment_product_cartItem/:userId",
  authToken,
  incrementCartItems
);

router.patch(
  "/decrement_product_cartItem/:userId",
  authToken,
  decrementCartItems
);

export default router;
