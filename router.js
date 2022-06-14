const express=require('express');
const { createAdmin } = require('./controllers/admin/admin');
const { createIndustries } = require('./controllers/industries/industries');
const { createProducts } = require('./controllers/products/product');
const { createUser, getUsers, getUser, updateUserName, updateUserEmail } = require('./controllers/users/user');


const router=express.Router();

// users routes
router.get("/all_users",getUsers)
router.post("/create_account",createUser)
router.get("/single_user/:userId",getUser)
router.patch("/update_user_name/:userId",updateUserName)
router.patch("/update_user_email/:userId",updateUserEmail)
// users routes ends here


// products routes
router.post("/products", createProducts)
// products routes ends here


// admin routes

router.post("/create_admin", createAdmin)




// industries routes
router.post("/industries", createIndustries)


module.exports=router;