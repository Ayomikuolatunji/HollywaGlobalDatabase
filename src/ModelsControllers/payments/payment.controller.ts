import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import { throwError } from "../../middleware/cacheError";
import userModel from "../users/user.model";
import paymentsModel from "./payments.model";

var paystack = require("paystack")(
  "sk_test_4ea7cac25305df8697626eb659fc625a5a400446"
);

export const PaymentGateWay: RequestHandler = async (req, res, next) => {
  try {
    const findUser = await userModel.findById({ _id: req.params.userId });
    if (!findUser) {
      throwError("user not found", StatusCodes.NOT_FOUND);
    }
    // const productIds = req.body.productIds;
    // if (!productIds.length) {
    //   throwError("Provide product Ids", StatusCodes.BAD_REQUEST);
    // }
    if (!req.body.amount) {
      throwError("provide amount", StatusCodes.BAD_REQUEST);
    }
    const createPayment = await paymentsModel.create({
      userId: findUser?._id,
      amount: req.body.amount * 100,
    });

    if (createPayment) {
      // Make payment using Paystack API
      const response = await paystack.transaction.initialize({
        amount: req.body.amount * 100,
        email: req.body.email,
      });
    }
    res.status(201).json({ message: "ok", createPayment });
  } catch (error) {
    console.log(error);
  }
};
