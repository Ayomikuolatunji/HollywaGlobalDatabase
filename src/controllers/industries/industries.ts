const { db } = require("../../src/models")
const data =require('../../data.json')



module.exports.createIndustries=async(req,res,next)=>{
    try {
        const industries=await db.industries.bulkCreate([...data])
        return res.status(201).json({industries})
    } catch (error) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}