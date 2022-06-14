const bcrypt = require('bcrypt');
const { db } = require("../../models")




const createUser = async(req, res,next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if(!name || !email || !password) {
            const error = new Error("Please provide all the required fields");
            error.statusCode = 400;
            throw error;
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser=await db.user.create({
            name,
            email,
            password:hashPassword
        });
        res.status(201).json({newUser})
    }catch(error){
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

module.exports = {
    createUser
}
