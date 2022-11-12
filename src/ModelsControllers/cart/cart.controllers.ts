import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { HydratedDocument } from "mongoose";
import { throwError } from "../../middleware/cacheError";
import { cartItemTypes } from "../../typings/ModelTypings";
import cartDb from "./cart.model";

export const createProductsCart: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.query.productId;
    const userId = req.params.userId;
    if (!productId || !userId)
      throwError(
        "Invalid params or query id",
        StatusCodes.UNPROCESSABLE_ENTITY
      );
    const findProduct: any = await cartDb.findOne({
      productId: productId,
    });
    if (!findProduct) {
      const queryProduct = new cartDb({
        productId: productId,
        userId: userId,
      });
      let creatCartItem = await queryProduct.save();
      res.status(201).json({
        message: "Product added to cart successfully",
        cartItems: creatCartItem,
      });
    } else {
      throwError("Item added already, increment only", StatusCodes.CONFLICT);
    }
  } catch (error) {
    next(error);
  }
};

export const incrementCartItems: RequestHandler = async (req, res, next) => {
  const productId = req.query.productId;
  const userId = req.params.userId;
  if (!productId || !userId)
    throwError("Invalid params or query id", StatusCodes.UNPROCESSABLE_ENTITY);
  const findProduct: any = await cartDb.findOne({
    productId: productId,
  });
  if (productId && findProduct) {
    await cartDb.updateOne({
      productCount: +(findProduct.productCount + 1),
    });
  }
  res.status(200).json({ message: "Incremented successfully by 1" });
};

export const decrementCartItems: RequestHandler = async (req, res, next) => {
  const productId = req.query.productId;
  const userId = req.params.userId;
  if (!productId || !userId)
    throwError("Invalid params or query id", StatusCodes.UNPROCESSABLE_ENTITY);
  const findProduct: any = await cartDb.findOne({
    productId: productId,
  });
  if (productId && findProduct) {
    await cartDb.updateOne({
      productCount: +(findProduct.productCount - 1),
    });
  }
  res.status(200).json({ message: "Incremented successfully by 1" });
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
    res.status(201).json({
      message: "Item added to cart successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCartProduct: RequestHandler = async (req, res, next) => {
  try {
    const findCartId = req.query.cartId;
    const findUserId = req.query.userId;
    if (!findCartId || !findUserId)
      throwError(
        "You are not allowed to delete to cart",
        StatusCodes.UNPROCESSABLE_ENTITY
      );
    const findcartItem = await cartDb.findOneAndDelete({
      _id: findCartId,
      userId: findUserId,
    });
    res.status(200).json({
      message: "Item deleted successfully",
      cartItem: findcartItem,
    });
  } catch (error) {
    next(error);
  }
};
