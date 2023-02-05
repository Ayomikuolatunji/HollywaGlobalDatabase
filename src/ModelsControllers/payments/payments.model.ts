import { Schema, model } from "mongoose";

const PaymentGateWay = new Schema(
  {
    productIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductSchema",
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "userSchemas",
    },
    amount: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("payment", PaymentGateWay);
