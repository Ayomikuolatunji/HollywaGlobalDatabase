import { Schema, model } from "mongoose";

interface cartItemTypes {
  productId: string;
  userId: string;
}

const userCartItem = new Schema(
  {
    productId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default model("userCartItems", userCartItem);
