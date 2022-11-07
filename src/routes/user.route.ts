import express from 'express';
import { createUser, getUser, getUsers, loginUser, updateUserEmail, updateUserName } from '../ModelsControllers/users/user.controller';
import { createAdress, getUserAdress, updateUserAddress } from '../ModelsControllers/users/userAddress.controller';
import { createUserPayment, updateUserPayment } from '../ModelsControllers/users/userPayment.controller';
const router=express.Router();;



// users routes
router.get("/all_users",getUsers)
router.post("/create_account",createUser)
router.post("/login",loginUser)
router.get("/single_user/:userId",getUser)
router.patch("/update_user_name/:userId",updateUserName)
router.patch("/update_user_email/:userId",updateUserEmail)


// user address routes
router.post("/create_user_address",createAdress)
router.get("/get_user_address/:userId",getUserAdress)
router.patch("/update_user_address/:userId",updateUserAddress)

// user payement routes

router.post("/create_user_payment",createUserPayment)
router.patch("/update_user_payment/:userId",updateUserPayment)




export default router;