const express=require('express');
const { createIndustries } = require('./controllers/industries/industries');
const { createUser, getUsers, getUser } = require('./controllers/users/user');


const router=express.Router();

// users routes
router.get("/all_users",getUsers)
router.post("/create_account",createUser)
router.get("single_user/:userId",getUser)


router.post("/industries", createIndustries)


module.exports=router;