const { db } = require("../../models")


const createAdress=async(req,res,next)=>{
    try {
        const userAdress=await db.userAddressModel.create({
            ...req.bod,
            userId:req.userId
        })
        res.status(201).json({userAdress, message:"Address created successfully"})
    } catch (error) {
        
    }
}


module.exports={
    createAdress
}