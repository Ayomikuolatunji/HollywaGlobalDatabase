import express from "express";
import { createProductsCart } from "../ModelsControllers/cart/ProductCart";
import authToken from "../middleware/authToken";

const router = express.Router();

router.post("/add_product_to_cart", authToken, createProductsCart);

export default router;
