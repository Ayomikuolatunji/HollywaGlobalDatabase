import { RequestHandler } from 'express';
import { data } from '../../data';
import { db } from '../../models';





export const createIndustries:RequestHandler=async(req,res,next)=>{
    try {
        const industries=await db.industries.bulkCreate([...data])
        return res.status(201).json({industries})
    } catch (error:any) {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}