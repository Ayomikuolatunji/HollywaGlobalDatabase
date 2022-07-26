import { NextFunction, Request,  Response } from "express";
import  Jwt  from "jsonwebtoken";
import { Error } from "../typings/requestErrorTypings";
import { throwError } from "./cachError";

export default (req:Request | any, res:Response, next:NextFunction) => {
    try {
        let decode:any;
        const token=req.get("Authorization")?.split(" ")[1];
        if(token){
            decode=Jwt.verify(token, `${process.env.JWT_SECRET}`);
        }
        if(!token || !decode){
            throwError("Invalid token",401);
        }
        req.id=decode?.id;
        next();
    } catch (error) {
        const errorResponse:Error = new Error("Not authorized");
        errorResponse.statusCode = 401;
        next(errorResponse);
    }
}