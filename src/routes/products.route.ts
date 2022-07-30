import express from "express"
import authToken from "../middleware/authToken";
const router=express.Router();


import { createProducts, getProducts } from "../controllers/products/product";


router.get("products",authToken,getProducts);
router.post("/products", authToken, createProducts)


export default router;