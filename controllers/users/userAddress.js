const { db } = require("../../models")


const createAdress=async(req,res,next)=>{
    try {     
        // check if user already has an adress using userid
        const findUser=await  db.userAddressModel.findOne({
            where:{
                userId:req.body.userId
            }
        })
        if(findUser){
            const error=new Error('User already has an adress');
            error.statusCode=404;
            throw error;
        }


        const address_line1=req.body.address_line1;
        const address_line2=req.body.address_line2;
        const city=req.body.city;
        const postal_code=req.body.postal_code;
        const country=req.body.country;
        const telephone=req.body.telephone;

        const userAdress=await db.userAddressModel.create({
            address_line1,
            address_line2,
            city,
            postal_code,
            country,
            telephone,
            userId:req.body.userId
        })
        res.status(201).json({userAdress, message:"Address created successfully"})
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


const getUserAdress=async(req,res,next)=>{
    try {     
        // check if user already has an adress using userid
        const findUser=await  db.userAddressModel.findOne({
            where:{
                userId:req.params.userId
            }
        })
        if(!findUser){
            const error=new Error('User does not have an adress');
            error.statusCode=404;
            throw error;
        }
        res.status(200).json({findUser})
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


module.exports={
    createAdress,
    getUserAdress
}