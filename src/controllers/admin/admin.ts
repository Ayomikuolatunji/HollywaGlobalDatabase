import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import Jwt from 'jsonwebtoken';
import { db } from '../../models';


const createAdmin: RequestHandler = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        await db.admin.create({
            username,
            email,
            password: hashedPassword
        })
        res.status(201).json({ message: "Admin created successfully" })
    } catch (error: any) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


const signInAdmin: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const loginAdmin = await db.admin.findOne({
            where: {
                email: email
            }
        })
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
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error);
    }
}

const oneAdmin: RequestHandler = async (req, res, next) => {
    try {
        const adminId = req.params
        const findAdmin = await db.admin.findOne({
            where: {
                adminId: adminId
            }
        })
        res.status(200).json({ adminid: findAdmin.adminId })
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