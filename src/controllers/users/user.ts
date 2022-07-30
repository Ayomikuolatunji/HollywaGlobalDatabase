import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import jwt from "jsonwebtoken"
import { throwError } from '../../middleware/cachError';
import { db } from '../../models';



export const createUser:RequestHandler= async(req, res,next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const hashedPassword = await bcrypt.hash(password, 12);
        await db.user.create({
            username,
            first_name,
            last_name,
            email,
            password:hashedPassword
        });
        res.status(201).json({message:"user account created successfully"})
    }catch(error:any){
        console.log(error.message);
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


export const loginUser:RequestHandler=async(req,res,next)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const findUser:any=await db.user.findOne({
            where:{
                email:email
            }
        })
        const passwordCorrect=await bcrypt.compare(password, findUser.password);
        if(!passwordCorrect){
            throwError("Invalid password",401);
        }
        const token = jwt.sign(
            {
              email: findUser.email,
              userId: findUser.userId
            },
            `${process.env.JWT_SECRET}`,
            { expiresIn: '30d' }
          );
        res.status(200).json({message:"user logged in successfully",token, })
    } catch (error:any) {
        console.log(error.message);
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


export const getUsers:RequestHandler = async(req, res,next) => {
    try {
        const allusers = await db.user.findAll({});
        res.status(200).json({allusers})
    } catch (error:any) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


export const getUser:RequestHandler = async(req, res,next) => {
    try{
      const userId=req.params.userId;
      const findUser=await db.user.findOne({
            where:{
                userId:userId
            }
      })
      if(!userId){
            const error:any=new Error('User not found');
            error.statusCode=404;
            throw error;
      }
      res.status(200).json({findUser})

    }catch(error:any){
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


export const updateUserName:RequestHandler= async(req, res,next) => {
    try{
        const userId=req.params.userId;
        const username = req.body.username;
        if(!userId){
            const error:any=new Error('User not found');
            error.statusCode=404;
            throw error;
        }
        const findUser=await db.user.findOne({
            where:{
                userId:userId
            }
        })
        if(!findUser){
            const error:any=new Error('User not found');
            error.statusCode=404;
            throw error;
        }
        const updateuserName=await db.user.update({
                username:username
          },{
            where:{
               userId:userId,
            }
         })
        res.status(200).json({updateuserName})
    }catch(error:any){
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export const updateUserEmail:RequestHandler= async(req, res,next) => {
    try{
        const userId=req.params.userId;
        const email = req.body.email;
        if(!userId){
            const error:any=new Error('User not found');
            error.statusCode=404;
            throw error;
        }
        const findUser=await db.user.findOne({
            where:{
                userId:userId
            }
        })
        if(!findUser){
            const error:any=new Error('User not found');
            error.statusCode=404;
            throw error;
        }
        const updateEmail=await db.user.update({
                email:email
          },{
            where:{
               userId:userId,
            }
         })
        res.status(200).json({updateEmail:updateEmail, message:"Email updated successfully"})
    }catch(error:any){
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


export const restPassword:RequestHandler= async(req, res,next) => {
         
}
export const deleteUser:RequestHandler = async(req, res,next) => {
    
}