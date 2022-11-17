import { Schema, model } from "mongoose";
import { cartItemTypes } from "../../typings/ModelTypings";

const userCartItem = new Schema<cartItemTypes>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "ProductSchema",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "userSchemas",
    },
    productCount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<cartItemTypes>("userCartItems", userCartItem);
