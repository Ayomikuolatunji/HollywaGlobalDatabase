import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import  Jwt  from 'jsonwebtoken';
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


const signInAdmin:RequestHandler=async (req, res,next) => {
    try{
         const {email,password}=req.body
         const comparePassword=await bcrypt.compare(password,db.admin.password);
            if(!comparePassword){
                throw new Error('Invalid password');
            }
        const loginAdmin=await db.admin.findOne({
            where:{
                email:email
            }
        })
        const token=Jwt.sign({
            email:loginAdmin.email,
            adminId:loginAdmin.adminId
          },`${process.env.JWT_SECRET}`,{expiresIn:'30d'})
    }catch(error){

    }
}

export  {
    createAdmin,
    signInAdmin
}