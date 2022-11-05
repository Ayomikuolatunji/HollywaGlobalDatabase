import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../../models";

const createProductsCart: RequestHandler =async (req, res, next) => {
   try {
    const userId = req.query.userId;
    const productId = req.body.productId;
    const createProductsCart = await db.productCart.create({
      userId,
      productId,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Product add to cart", cartItem: createProductsCart });
   } catch (error) {
    
   }
};

export { createProductsCart };
