import express from 'express';
import { createAdmin } from './controllers/admin/admin';
import { createIndustries } from './controllers/industries/industries';
import { createProducts } from './controllers/products/product';



const router=express.Router();


// users routes ends here


// products routes
router.post("/products", createProducts)
// products routes ends here


// admin routes

router.post("/create_admin", createAdmin)




// industries routes
router.post("/industries", createIndustries)


export default router;