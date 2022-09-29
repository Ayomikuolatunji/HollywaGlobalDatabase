import express from "express";
import authToken from "../middleware/authToken";
const router = express.Router();

import {
  bulkyDeleteFunction,
  changeProductStatus,
  createProducts,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
  createProductsDepartments
} from "../controllers/products/product";




// protected routes
router.get("/products", authToken, getProducts);
router.get("/products/:productId", authToken, getProduct);
router.post("/products", authToken, createProducts);
router.delete("/products/:productId", authToken, deleteProduct);
router.patch("/products/product_status", authToken, changeProductStatus);
router.patch("/products/:productId", authToken, editProduct);
router.post("/create_products_departments", authToken, createProductsDepartments)
router.delete("/products/delete_many", authToken, bulkyDeleteFunction);

export default router;
