import express from "express";
import authToken from "../middleware/authToken";
const router = express.Router();

import {
  changeProductStatus,
  createProducts,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from "../controllers/products/product";

router.get("/products", authToken, getProducts);
router.get("/products/:productId", authToken, getProduct);
router.post("/products", authToken, createProducts);
router.delete("/products/:productId", authToken, deleteProduct);
router.patch("/products/product_status", authToken, changeProductStatus);
router.patch("/products/:productId", authToken, editProduct);

export default router;
