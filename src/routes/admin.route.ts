import express from 'express';
import { createAdmin, signInAdmin } from '../controllers/admin/admin';




const router = express.Router();


// admin routes

router.post("/create_admin", createAdmin)
router.post("/admin_signin", signInAdmin)




export default router;