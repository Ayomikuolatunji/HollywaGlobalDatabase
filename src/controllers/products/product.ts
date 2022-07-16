import { RequestHandler } from "express";
import { db } from "../../models";



const createProducts:RequestHandler=async(req,res,next)=>{
    try {
        const products=await db.products.create({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            type:req.body.type,
            image:req.body.image,
            adminId:req.body.adminid
        })
       res.status(201).json({message:"Product created successfully",products})
    } catch (error:any) {
        if(!error.statusCode){
            error.statusCode=500;
        }
        next(error);
    }
}


export {
    createProducts
}