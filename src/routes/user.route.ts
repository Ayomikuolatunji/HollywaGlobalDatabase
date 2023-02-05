import express from "express";
import authToken from "../middleware/authToken";
import { PaymentGateWay } from "../ModelsControllers/payments/payment.controller";
import {
  createUser,
  getUser,
  getUsers,
  loginUser,
  updateUserEmail,
  updateUserName,
} from "../ModelsControllers/users/user.controller";
import {
  createAddress,
  getuserAddress,
  updateUserAddress,
} from "../ModelsControllers/users/userAddress.controller";
import {
  createUserPayment,
  updateUserPayment,
} from "../ModelsControllers/users/userPayment.controller";
const router = express.Router();

// users routes
router.get("/all_users", authToken, getUsers);
router.post("/create_account", createUser);
router.post("/login", loginUser);
router.get("/single_user/", authToken, getUser);
router.patch("/update_user_name/:userId", updateUserName);
router.patch("/update_user_email/:userId", updateUserEmail);

// user address routes
router.post("/create_user_address", createAddress);
router.get("/get_user_address/:userId", getuserAddress);
router.patch("/update_user_address/:userId", updateUserAddress);

// user payments routes
router.post("/create_user_payment/:userId", PaymentGateWay);
router.patch("/update_user_payment/:userId", updateUserPayment);

export default router;
