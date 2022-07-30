import express from 'express';
import { createAdmin, oneAdmin, signInAdmin } from '../controllers/admin/admin';




const router = express.Router();


// admin routes
router.post("/create_admin", createAdmin)
router.post("/admin_signin", signInAdmin)
router.get("/admin/:id", oneAdmin)




export default router;