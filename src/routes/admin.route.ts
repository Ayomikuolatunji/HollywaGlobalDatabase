import express from "express";
import authToken from "../middleware/authToken";
import {
  createAdmin,
  getAdmin,
  signInAdmin,
} from "../ModelsControllers/admin/admin.controller";

const router = express.Router();

// admin routes
router.post("/create_admin", createAdmin);
router.post("/admin_signin", signInAdmin);
router.get("/admin/:adminId", authToken, getAdmin);

export default router;
