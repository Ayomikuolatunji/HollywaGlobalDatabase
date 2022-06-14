const express=require('express');
const { createUser, getUsers } = require('./controllers/users/user');


const router=express.Router();


router.get("/all_users",getUsers)
router.post("/create_account",createUser)


module.exports=router;