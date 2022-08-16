import express from 'express';
import authToken from "../middleware/authToken";
import { createAdmin, oneAdmin, signInAdmin } from '../controllers/admin/admin';




const router = express.Router();


// admin routes
router.post("/create_admin", createAdmin)
router.post("/admin_signin", signInAdmin)
router.get("/admin/:adminId",authToken,oneAdmin)




export default router;