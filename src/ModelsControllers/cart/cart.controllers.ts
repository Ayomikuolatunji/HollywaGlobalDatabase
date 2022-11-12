import { RequestHandler } from "express";
import cartDb from "./cart.model";

export const createProductsCart: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.query.productId;
    const userId = req.params.userId;
    const queryProduct = new cartDb({
      productId: productId,
      userId: userId,
    });
    await queryProduct.save();
    res.status(201).json({
      message: "Item added to cart successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getCartProduct: RequestHandler = async (req, res, next) => {
  try {
    const findUser = req.params.userId;
    const findUserCartItems = await cartDb
      .find({ userId: findUser })
      .populate("productId")
      .exec();
    res.status(200).json({
      message: "cartItems fetched successfully",
      cartItems: findUserCartItems,
    });
  } catch (error) {
    next(error);
  }
};
