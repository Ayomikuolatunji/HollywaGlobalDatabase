import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import Jwt from 'jsonwebtoken';
import { throwError } from '../../middleware/cachError';
import { db } from '../../models';


const createAdmin: RequestHandler = async (req, res, next) => {
    try {
        const password = req.body.password;
        const username = req.body.username;
        const email = req.body.email;
        if(!password || !username || !email) {
            throwError("Please fill all the fields", 400);
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await db.admin.create({
            username,
            email,
            password: hashedPassword
        })
        res.status(201).json({ message: "Admin created successfully" })
    } catch (error: any) {
        next(error);
    }
}


const signInAdmin: RequestHandler = async (req, res, next) => {
    try {
        const password = req.body.password
        const email = req.body.email
        const loginAdmin = await db.admin.findOne({
            where: {
                email: email
            }
        })
        if(!loginAdmin) {
            throwError("Admin not found with the email provided", 404);
        }
        const comparePassword = await bcrypt.compare(password, loginAdmin.password);
        if (!comparePassword) {
            throw new Error('Invalid password');
        }
        const token = Jwt.sign({
            email: loginAdmin.email,
            id: loginAdmin.adminId
        }, `${process.env.JWT_SECRET}`, { expiresIn: "30 days" })

        res.status(200).json({ message: "Admin logged in successfully", token, adminId: loginAdmin.id })
    } catch (error: any) {
        next(error);
    }
}

const oneAdmin: RequestHandler = async (req, res, next) => {
    try {
        const adminId = req.params.adminId
        const findAdmin = await db.admin.findOne({
            where: {
                id: adminId
            }
        })
        res.status(200).json({ adminid: findAdmin.id, message:"Admin fetch successfully" })
    } catch (error: any) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}


export {
    createAdmin,
    signInAdmin,
    oneAdmin
}