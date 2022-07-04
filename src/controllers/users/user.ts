const bcrypt = require('bcrypt');
const { db } = require("../../src/models")




module.exports.createUser = async(req, res,next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser=await db.user.create({
            username,
            first_name,
            last_name,
            email,
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
        const username = req.body.username;
        if(!userId){
            const error=new Error('User not found');
            error.statusCode=404;
            throw error;
        }
        const findUser=await db.user.findOne({
            where:{
                userId:userId
            }
        })
        if(!findUser){
            const error=new Error('User not found');
            error.statusCode=404;
            throw error;
        }
        const updateuserName=await db.user.update({
                username:username
          },{
            where:{
               userId:userId,
            }
         })
        res.status(200).json({updateuserName})
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
        if(!userId){
            const error=new Error('User not found');
            error.statusCode=404;
            throw error;
        }
        const findUser=await db.user.findOne({
            where:{
                userId:userId
            }
        })
        if(!findUser){
            const error=new Error('User not found');
            error.statusCode=404;
            throw error;
        }
        const updateEmail=await db.user.update({
                email:email
          },{
            where:{
               userId:userId,
            }
         })
        res.status(200).json({updateEmail:updateEmail, message:"Email updated successfully"})
    }catch(error){
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


module.exports.restPassword= async(req, res,next) => {
    
}

module.exports.deleteUser = async(req, res,next) => {

}