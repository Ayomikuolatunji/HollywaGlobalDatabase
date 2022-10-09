import express from "express";
import { createProductsCart } from "../controllers/cart/ProductCart";

const router = express.Router();

router.post("/add_product_to_cart", createProductsCart);

export default router;
