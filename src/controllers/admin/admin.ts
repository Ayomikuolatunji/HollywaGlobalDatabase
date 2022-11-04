import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import Jwt from "jsonwebtoken";
import { throwError } from "../../middleware/cachError";
import db from "./model.admin";

const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;
    if (!password || !username || !email) {
      throwError("Please fill all the fields", StatusCodes.BAD_REQUEST);
    }
    const findAdmin = await db.findOne({ email: email });
    if (findAdmin) {
      throwError("admin already exits", StatusCodes.CONFLICT);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const admin = new db({
      username,
      email,
      password: hashedPassword,
    });
    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error: any) {
    next(error);
  }
};

const signInAdmin: RequestHandler = async (req, res, next) => {
  try {
    const password = req.body.password;
    const email = req.body.email;
    const loginAdmin: any = await db.findOne({ email: email });
    if (!loginAdmin) {
      throwError("Admin not found with the email provided", 404);
    }
    const comparePassword = await bcrypt.compare(
      password,
      loginAdmin.password!
    );
    if (!comparePassword) {
      throw new Error("Invalid password");
    }
    const token = Jwt.sign(
      {
        email: loginAdmin.email,
        id: loginAdmin.adminId,
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "30 days" }
    );

    res.status(200).json({
      message: "Admin logged in successfully",
      token,
      adminId: loginAdmin._id,
    });
  } catch (error: any) {
    next(error);
  }
};

const oneAdmin: RequestHandler = async (req, res, next) => {
  try {
    const adminId = req.params.adminId;
    if (!adminId) {
      throwError("Admin id is not found", 404);
    }
    const findAdmin: any = await db.findOne({ _id: adminId });
    res
      .status(200)
      .json({
        adminid: findAdmin._id,
        message: "Admin fetch successfully",
        profileData: findAdmin,
      });
  } catch (error: any) {
    next(error);
  }
};

export { createAdmin, signInAdmin, oneAdmin };
