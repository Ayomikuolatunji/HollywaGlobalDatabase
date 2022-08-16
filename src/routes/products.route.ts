import express from "express"
import authToken from "../middleware/authToken";
const router=express.Router();


import { changeProductStatus, createProducts, deleteProduct, getProducts } from "../controllers/products/product";


router.get("/products",authToken,getProducts);
router.post("/products",authToken, createProducts)
router.delete("/products/:productId",authToken, deleteProduct)
router.patch("/product_status/:productId",authToken, changeProductStatus)


export default router;