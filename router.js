const express=require('express');
const { createIndustries } = require('./controllers/industries/industries');
const { createUser, getUsers } = require('./controllers/users/user');


const router=express.Router();


router.get("/all_users",getUsers)
router.post("/create_account",createUser)


router.post("/industries", createIndustries)


module.exports=router;