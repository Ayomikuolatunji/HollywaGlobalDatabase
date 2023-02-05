import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { throwError } from "../../middleware/cacheError";
import userModel from "../users/user.model";
import paymentsModel from "./payments.model";

export const PaymentGateWay: RequestHandler = async (req, res, next) => {
  try {
    const findUser = await userModel.findById({ _id: req.params.userId });
    if (!findUser) {
      throwError("user not found", StatusCodes.NOT_FOUND);
    }
    const productIds = req.body.productIds;
    if (!productIds.length) {
      throwError("Provide product Ids", StatusCodes.BAD_REQUEST);
    }
    if (!req.body.amount) {
      throwError("provide amount", StatusCodes.BAD_REQUEST);
    }
    const createPayment = await paymentsModel.create({
      userId: findUser?._id,
      amount: req.body.amount,
    });

    if (createPayment) {
      await paymentsModel.updateOne(
        { _id: createPayment._id },
        {
          $push: { productIds: productIds },
        }
      );
    }
    res.status(201).json({ message: "ok" });
  } catch (error) {}
};
