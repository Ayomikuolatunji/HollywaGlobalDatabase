const bcrypt = require('bcrypt');
const { db } = require("../../models")




module.exports.createUser = async(req, res,next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const role=req.body.role;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser=await db.user.create({
            name,
            email,
            role,
            password:hashedPassword
        });
        res.status(201).json({newUser})
    }catch(error){
        console.log(error.message);
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


module.exports.getUsers = async(req, res,next) => {
    try {
        const allusers = await db.user.findAll({
            where:{
                id:[1,2,3]
            }
        });
        res.status(200).json({allusers})
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


module.exports.getUser = async(req, res,next) => {
    try{
      const userId=req.params.userId;
      const findUser=await db.user.findOne({
            where:{
                userId:userId
            }
      })
        res.status(200).json({findUser})

    }catch(error){
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


