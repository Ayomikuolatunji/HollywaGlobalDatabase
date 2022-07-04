const { db } = require("../../src/models");


const createProducts=async(req,res,next)=>{
    try {
        const products=await db.products.create({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            image:req.body.image,
            adminId:req.body.adminid
        })
       res.status(201).json({message:"Product created successfully",products})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode=500;
        }
        next(error);
    }
}


module.exports={
    createProducts
}