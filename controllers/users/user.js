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
        const allusers = await db.user.findAll({});
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
      if(!userId){
            const error=new Error('User not found');
            error.statusCode=404;
            throw error;
      }
      res.status(200).json({findUser})

    }catch(error){
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


module.exports.updateUserName= async(req, res,next) => {
    try{
        const userId=req.params.userId;
        const name = req.body.name;

        const updateName=await db.user.update({
                name:name
          },{
            where:{
               userId:userId,
            }
         })
        res.status(200).json({updateName})
    }catch(error){
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

module.exports.updateUserEmail= async(req, res,next) => {
    try{
        const userId=req.params.userId;
        const email = req.body.email;

        const updateName=await db.user.update({
                name:email
          },{
            where:{
               userId:userId,
            }
         })
        res.status(200).json({updateName})
    }catch(error){
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

module.exports.deleteUser = async(req, res,next) => {

}