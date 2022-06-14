const { db } = require("../../models")


const createAdress=async()=>{
    try {
        const userAdress=await db.userAddressModel.create({
            ...req.bod,
            userId:req.userId
        })
    } catch (error) {
        
    }
}


module.exports={
    createAdress
}