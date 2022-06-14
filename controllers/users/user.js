const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const { db } = require("../../models")




module.exports.createUser = async(req, res,next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password) {
            const error = new Error("Please provide all the required fields");
            error.statusCode = 400;
            throw error;
        }
        const newUser=await db.user.create({
            name,
            email,
            password
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


