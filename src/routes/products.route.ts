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
  createProductsDepartments,
  getAllProductsDepartments,
  getUserProducts,
} from "../controllers/products/product";

// unprotected routes
router.get("/all_department", getAllProductsDepartments);
// protected routes
router.delete("/products/delete_many", authToken, bulkyDeleteFunction);
router.get("/products", authToken, getProducts);
router.get("/user_products", getUserProducts)
router.get("/products/:productId", authToken, getProduct);
router.post("/products", authToken, createProducts);
router.delete("/products/:productId", authToken, deleteProduct);
router.patch("/products/product_status", authToken, changeProductStatus);
router.patch("/products/:productId", authToken, editProduct);
router.post(
  "/create_products_departments",
  authToken,
  createProductsDepartments
);


export default router;
