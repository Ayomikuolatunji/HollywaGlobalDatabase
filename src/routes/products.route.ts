import express from "express"
import authToken from "../middleware/authToken";
const router=express.Router();


import { createProducts } from "../controllers/products/product";



router.post("/products", authToken, createProducts)


export default router;