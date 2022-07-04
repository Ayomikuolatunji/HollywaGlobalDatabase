const bcrypt=require('bcrypt');
const {db} = require('../../models');


const createAdmin=async (req, res,next) => {
    try {
     const { name, email, password } = req.body;
      const hashedPassword=await bcrypt.hash(password,12);
      await db.admin.create({
            name,
            email,
            password:hashedPassword
      }) 
     res.status(201).json({message:"Admin created successfully"})
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