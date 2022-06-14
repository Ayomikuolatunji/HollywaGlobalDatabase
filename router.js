const express=require('express');
const { createUser } = require('./controllers/users/user');


const router=express.Router();


router.get("/create_account",createUser)


module.exports=router;