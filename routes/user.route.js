const express=require('express');
const router=express.Router();


const { getUsers, createUser, getUser, updateUserName, updateUserEmail } = require('../controllers/users/user');

const { createAdress, getUserAdress, updateUserAddress } = require('../controllers/users/userAddress');
const { createUserPayment, updateUserPayment } = require('../controllers/users/userPayment');



// users routes
router.get("/all_users",getUsers)
router.post("/create_account",createUser)
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




module.exports=router;