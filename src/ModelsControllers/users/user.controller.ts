import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { HydratedDocument } from "mongoose";
import dotenv from "dotenv";

import { getMutatedMomgooseField } from "../../helpers/utils";
import { throwError } from "../../middleware/cachError";
import { userModelTypes } from "../../typings/ModelTypings";
import db from "./user.model";
import { StatusCodes } from "http-status-codes";

dotenv.config();

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const first_name = req.body.first_name;
    const email = req.body.email;
    const password = req.body.password;
    const last_name = req.body.last_name;
    const findUser = await db.findOne({ email: email });
    if (findUser) {
      {
        throwError("user account already exits", StatusCodes.CONFLICT);
      }
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new db({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    const createUser: HydratedDocument<userModelTypes> = await user.save();
    res.status(201).json({
      message: "user account created successfully",
      user: getMutatedMomgooseField(createUser?._doc),
    });
  } catch (error: any) {
    console.log(error.message);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const findUser: any = await db.findOne({ email: email });
    const passwordCorrect = await bcrypt.compare(password, findUser.password);
    if (!passwordCorrect) {
      throwError("Invalid password", 401);
    }
    const token = jwt.sign(
      {
        email: findUser.email,
        id: findUser._id,
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "30d" }
    );
    res.status(200).json({
      message: "user logged in successfully",
      token,
      userId: findUser._id,
    });
  } catch (error: any) {
    console.log(error.message);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const allusers = await db.find({});
    res.status(200).json({ allusers });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const findUser: HydratedDocument<userModelTypes, any, {}> =
      await db.findOne({ _id: userId });
    if (!userId) {
      const error: any = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "User data fetched successfully",
      data: getMutatedMomgooseField(findUser._doc),
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const updateUserName: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const username = req.body.username;
    if (!userId) {
      const error: any = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const findUser = await db.findOne({
      where: {
        userId: userId,
      },
    });
    if (!findUser) {
      const error: any = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const updateuserName = await db.updateOne(
      {
        username: username,
      },
      {
        where: {
          userId: userId,
        },
      }
    );
    res.status(200).json({ updateuserName });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const updateUserEmail: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const email = req.body.email;
    if (!userId) {
      const error: any = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const findUser = await db.findOne({
      where: {
        userId: userId,
      },
    });
    if (!findUser) {
      const error: any = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const updateEmail = await db.updateOne(
      {
        email: email,
      },
      {
        where: {
          userId: userId,
        },
      }
    );
    res.status(200).json({
      updateEmail: updateEmail,
      message: "Email updated successfully",
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const restPassword: RequestHandler = async (req, res, next) => {};
export const deleteUser: RequestHandler = async (req, res, next) => {};
