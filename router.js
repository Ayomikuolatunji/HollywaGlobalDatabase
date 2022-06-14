const express=require('express');
const { createUser } = require('./controllers/users/user');


const router=express.Router();


router.post("/create_account",createUser)


module.exports=router;