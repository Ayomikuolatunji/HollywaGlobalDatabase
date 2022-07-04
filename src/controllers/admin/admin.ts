import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import { db } from '../../models';


const createAdmin:RequestHandler=async (req, res,next) => {
    try {
     const { name, email, password } = req.body;
      const hashedPassword=await bcrypt.hash(password,12);
      await db.admin.create({
            name,
            email,
            password:hashedPassword
      }) 
     res.status(201).json({message:"Admin created successfully"})
    } catch (error:any) {
        if(!error.statusCode){
            error.statusCode=500;
        }
        next(error);
    }
}


export  {
    createAdmin
}