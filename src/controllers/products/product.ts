import { RequestHandler } from "express";
import { throwError } from "../../middleware/cachError";
import { db } from "../../models";



const createProducts:RequestHandler=async(req,res,next)=>{
    try {
        if(!req.body.adminId){
            throwError("admin is not found",404)
        }
        const products=await db.products.create({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            type:req.body.type,
            image:req.body.image,
            adminId:req.body.adminId
        })
       res.status(201).json({message:"Product created successfully",products})
    } catch (error:any) {
        if(!error.statusCode){
            error.statusCode=500;
        }
        next(error);
    }
}

const getProducts:RequestHandler=async(req,res,next)=>{
    try {
        const products=await db.products.findAll({
            where:{
                adminId:req.body.adminid
            }
        })
        res.status(200).json({message:"Products retrieved successfully",products})
    } catch (error:any) {
        if(!error.statusCode){
            error.statusCode=500;
        }
        next(error);
    }
}


export {
    createProducts,
    getProducts
}