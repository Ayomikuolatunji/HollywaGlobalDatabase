import express from "express"
import authToken from "../middleware/authToken";
const router=express.Router();


import { createProducts, deleteProduct, getProducts } from "../controllers/products/product";


router.get("/products",authToken,getProducts);
router.post("/products",authToken, createProducts)
router.delete("/products/:productId",authToken, deleteProduct)


export default router;