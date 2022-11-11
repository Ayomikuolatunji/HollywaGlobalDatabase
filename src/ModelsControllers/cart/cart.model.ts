import { Schema, model } from "mongoose";

interface cartItemTypes {
  productId: string;
  userId: string;
}

const userCartItem = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "ProductSchema",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "userSchemas",
    },
  },
  { timestamps: true }
);

export default model("userCartItems", userCartItem);
