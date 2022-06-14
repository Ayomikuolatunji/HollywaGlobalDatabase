const adminModel = require("../../models/admin/admin.model");


const createAdmin=async (req, res,next) => {
    try {
        const { name, email, password } = req.body;

    
     const admin=await adminModel.create({
            name,
            email,
            password
     }) 
     res.status(201).json({admin, message:"Admin created successfully"})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode=500;
        }
        next(error);
    }
}


module.exports = {
    createAdmin
}