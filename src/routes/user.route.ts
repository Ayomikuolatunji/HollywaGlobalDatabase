import express from "express";
import authToken from "../middleware/authToken";
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



export default router;
