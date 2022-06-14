const express=require('express');
const router=express.Router();


const { getUsers, createUser, getUser, updateUserName, updateUserEmail } = require('../controllers/users/user');

const { createAdress, getUserAdress } = require('../controllers/users/userAddress');



// users routes
router.get("/all_users",getUsers)
router.post("/create_account",createUser)
router.get("/single_user/:userId",getUser)
router.patch("/update_user_name/:userId",updateUserName)
router.patch("/update_user_email/:userId",updateUserEmail)


// user address routes
router.post("/create_user_address",createAdress)
router.get("/get_user_address/:userId",getUserAdress)





module.exports=router;