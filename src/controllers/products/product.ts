import { RequestHandler } from "express";
const fs = require('fs');
const path = require('path');
import { throwError } from "../../middleware/cachError";
import { db } from "../../models";



const createProducts:RequestHandler=async(req,res,next)=>{
    let imageUrl=req.body.image
    try {
        if(!req.body.adminId){
            throwError("admin is not found",404)
        }
        const productAvailable =req.body.productAvailable === true ? "onsale" : "notsale";
        const products=await db.products.create({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description.trim(),
            type:req.body.type || "general",
            image:req.body.image,
            adminId:req.body.adminId,
            productAvailable:productAvailable,
            currency:req.body.currency,
        })
       res.status(201).json({message:"Product created successfully",products})
    } catch (error:any) {
        clearImage(imageUrl)
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
                adminId:req.query.adminId
            }
        })
        if(!products){
            throwError("Products not found",404)
        }
        res.status(200).json({message:"Products retrieved successfully",products})
    } catch (error:any) {
        if(!error.statusCode){
            error.statusCode=500;
        }
        next(error);
    }
}

const deleteProduct:RequestHandler=async(req,res,next)=>{
      try{
         const productId=req.params.productId;
         const adminId=req.query.adminId;
           await db.products.destroy({
            where:{
                id:productId,
                adminId:adminId
            }
         })
        // remove image from folder
        const productImage:any=await db.products.findOne({
            where:{
                id:productId,
                adminId:adminId
            }
        })
        if(productImage){
            clearImage(productImage.image)
        }
        res.status(200).json({message:"Product deleted successfully", productId}) 

      }catch(error){
        next(error)
      }
}

const clearImage = (filePath:string)=> {
    filePath = path.join(__dirname,"../../../",filePath);
    fs.unlink(filePath, (err:any) => console.log(err));
};


export {
    createProducts,
    getProducts,
    deleteProduct
}