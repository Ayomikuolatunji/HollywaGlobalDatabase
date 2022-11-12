import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { throwError } from "../../middleware/cacheError";
import cartDb from "./cart.model";
import productDb from "../products/product.model";

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
    if (productId && findProduct) {
      let newAmount = +findProduct.totalAmount;
      newAmount -= +findProduct.productId.price;
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
    const findUserCartItems = await cartDb
      .find({ userId: findUser })
      .populate("productId")
      .exec();

    if (findUserCartItems) {
      let userTotalProductAmounts: Array<number> = [];
      findUserCartItems.forEach((ele: any) => {
        userTotalProductAmounts.push(ele.totalAmount);
      });
      let totalSucessfulCartItems = userTotalProductAmounts.reduce(
        (rev: number, cal: number) => {
          return rev + cal / 100;
        },
        0
      );
      res.status(200).json({
        message: "cartItems fetched successfully",
        cartItems: findUserCartItems,
        totalAmounts: totalSucessfulCartItems,
      });
    }
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
