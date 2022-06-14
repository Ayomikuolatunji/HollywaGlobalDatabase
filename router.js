const express=require('express');
const { createIndustries } = require('./controllers/industries/industries');
const { createUser, getUsers, getUser, updateUserName, updateUserEmail } = require('./controllers/users/user');


const router=express.Router();

// users routes
router.get("/all_users",getUsers)
router.post("/create_account",createUser)
router.get("/single_user/:userId",getUser)
router.patch("/update_user_name/:userId",updateUserName)
router.patch("/update_user_name/:userId",updateUserEmail)

router.post("/industries", createIndustries)


module.exports=router;