import { RequestHandler } from "express";
import db from "./userAddress.model";

const createAdress: RequestHandler = async (req, res, next) => {
  try {
    // check if user already has an adress using userid
    const findUser = await db.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (findUser) {
      const error: any = new Error("User already has an adress");
      error.statusCode = 404;
      throw error;
    }
    const address_line1 = req.body.address_line1;
    const address_line2 = req.body.address_line2;
    const city = req.body.city;
    const postal_code = req.body.postal_code;
    const country = req.body.country;
    const telephone = req.body.telephone;

    const userAdress = await db.create({
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
      .json({ userAdress, message: "Address created successfully" });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const getUserAdress: RequestHandler = async (req, res, next) => {
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

export { createAdress, getUserAdress, updateUserAddress };
