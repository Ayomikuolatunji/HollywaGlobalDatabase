import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { throwError } from "../../middleware/cacheError";
import db from "./userAddress.model";

const createAddress: RequestHandler = async (req, res, next) => {
  try {
    // check if user already has an adress using userid
    const findUser = await db.findById({
      _id: req.body.userId,
    });
    if (findUser) {
      throwError("User not found", StatusCodes.NOT_FOUND);
    }
    const address_line1 = req.body.address_line1;
    const address_line2 = req.body.address_line2;
    const city = req.body.city;
    const postal_code = req.body.postal_code;
    const country = req.body.country;
    const telephone = req.body.telephone;

    const userAddress = await db.create({
      address_line1,
      address_line2,
      city,
      postal_code,
      country,
      telephone,
      userId: req.body.userId,
    });
    res
      .status(201)
      .json({ userAddress, message: "Address created successfully" });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const getuserAddress: RequestHandler = async (req, res, next) => {
  try {
    // check if user already has an adress using userid
    const findUser = await db.findOne({
      where: {
        userId: req.params.userId,
      },
    });
    if (!findUser) {
      const error: any = new Error("User does not have an adress");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ findUser });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const updateUserAddress: RequestHandler = async (req, res, next) => {
  try {
    const address_line1 = req.body.address_line1;
    const address_line2 = req.body.address_line2;
    const city = req.body.city;
    const postal_code = req.body.postal_code;
    const country = req.body.country;
    const telephone = req.body.telephone;

    const updateUserAddress = await db.update(
      {
        address_line1,
        address_line2,
        city,
        postal_code,
        country,
        telephone,
        userId: req.params.userId,
      },
      {
        where: {
          userId: req.params.userId,
        },
      }
    );
    res
      .status(200)
      .json({ updateUserAddress, message: "Address updated successfully" });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export { createAddress, getuserAddress, updateUserAddress };
