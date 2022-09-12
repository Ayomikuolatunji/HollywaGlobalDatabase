import express from 'express';
import { createIndustries } from './controllers/industries/industries';




const router=express.Router();




router.get("/",(req,res,next)=>{
    res.json({more:"hey"})
})


// industries routes
router.post("/industries", createIndustries)


export default router;