import express from "express"
const router=express.Router();


import { createProducts } from "../controllers/products/product";



router.post("/products", createProducts)


export default router;