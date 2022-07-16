import express from 'express';
import { createAdmin } from '../controllers/admin/admin';




const router=express.Router();


// admin routes

router.post("/create_admin", createAdmin)




export default router;