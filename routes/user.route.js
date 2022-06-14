const express=require('express');
const { getUsers, createUser, getUser, updateUserName, updateUserEmail } = require('../controllers/users/user');
const { createAdress } = require('../controllers/users/userAddress');
const router=express.Router();


// users routes
router.get("/all_users",getUsers)
router.post("/create_account",createUser)
router.get("/single_user/:userId",getUser)
router.patch("/update_user_name/:userId",updateUserName)
router.patch("/update_user_email/:userId",updateUserEmail)


// user address routes
router.post("/create_address",createAdress)





module.exports=router;