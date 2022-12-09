import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { throwError } from "../../middleware/cacheError";
import cartDb from "./cart.model";
import productDb from "../products/product.model";
import { cartItemTypes } from "../../typings/ModelTypings";

export const createProductsCart: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.query.productId;
    const userId = req.params.userId;
    if (!productId || !userId)
      throwError(
        "Invalid params or query id",
        StatusCodes.UNPROCESSABLE_ENTITY
      );
    const findCartProduct: any = await cartDb.findOne({
      productId: productId,
    });
    const findProduct = await productDb.findOne({ _id: productId });
    if (!findCartProduct) {
      const queryProduct = new cartDb({
        productId: productId,
        userId: userId,
        totalAmount: findProduct!.price,
      });
      let creatCartItem = await queryProduct.save();
      await productDb.updateOne({ _id: productId }, { item_in_cart: true });
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
  try {
    const productId = req.query.productId;
    const userId = req.params.userId;
    if (!productId || !userId)
      throwError(
        "Invalid params or query id",
        StatusCodes.UNPROCESSABLE_ENTITY
      );
    const findProduct: any = await cartDb
      .findOne({
        productId: productId,
      })
      .populate("productId")
      .exec();

    if (!findProduct) throwError("CartItem not found", StatusCodes.NOT_FOUND);

    if (productId && findProduct) {
      let newAmount = +findProduct.productId.price;
      newAmount += +findProduct.totalAmount;
      await cartDb.updateOne(
        { productId: productId, userId: userId },
        {
          productCount: +(findProduct.productCount + 1),
          totalAmount: newAmount,
        }
      );
    }
    res.status(200).json({ message: "Incremented successfully by 1" });
  } catch (error) {
    next(error);
  }
};

export const decrementCartItems: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.query.productId;
    const userId = req.params.userId;
    if (!productId || !userId)
      throwError(
        "Invalid params or query id",
        StatusCodes.UNPROCESSABLE_ENTITY
      );
    const findProduct: any = await cartDb
      .findOne({
        productId: productId,
      })
      .populate("productId")
      .exec();
    if (!findProduct) throwError("CartItem not found", StatusCodes.NOT_FOUND);
    if (productId && findProduct) {
      let newAmount =
        parseInt(findProduct.totalAmount) -
        parseInt(findProduct.productId.price);
      await cartDb.updateOne(
        { productId: productId, userId: userId },
        {
          productCount: +(findProduct.productCount - 1),
          totalAmount: newAmount,
        }
      );
    }
    res.status(200).json({ message: "Decrement successfully by 1" });
  } catch (error) {
    next(error);
  }
};

export const getCartProducts: RequestHandler = async (req, res, next) => {
  try {
    const findUser = req.params.userId;
    if (!findUser) throwError("Please ", StatusCodes.NOT_FOUND);
    const findUserCartItems = await cartDb
      .find({ userId: findUser })
      .populate("productId")
      .exec();
    if (!findUserCartItems)
      throwError(
        "User not found or invalid id was passed",
        StatusCodes.NOT_FOUND
      );
    let userTotalProductAmounts: Array<number> = [];
    findUserCartItems.forEach((ele: cartItemTypes) => {
      userTotalProductAmounts.push(ele.totalAmount);
    });
    let totalSuccessfulCartItems = userTotalProductAmounts.reduce(
      (rev: number, cal: number) => {
        return rev + cal / 100;
      },
      0
    );
    res.status(200).json({
      message: "cartItems fetched successfully",
      cartItems: findUserCartItems,
      totalAmounts: Math.ceil(totalSuccessfulCartItems),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCartProduct: RequestHandler = async (req, res, next) => {
  try {
    const findCartId = req.query.cartId;
    const productId = req.query.productId;
    const findUserId = req.params.userId;
    if (!findCartId || !findUserId)
      throwError(
        "You are not allowed to delete to cart",
        StatusCodes.UNPROCESSABLE_ENTITY
      );
    const findcartItem = await cartDb.findOneAndDelete({
      _id: findCartId,
      userId: findUserId,
    });
    await productDb.updateOne({ _id: productId }, { item_in_cart: false });
    res.status(200).json({
      message: "Item deleted successfully",
      cartItem: findcartItem,
    });
  } catch (error) {
    next(error);
  }
};
