import mongoose from "mongoose";
import { productTypes } from "../../typings/ModelTypings";

const productSchema = new mongoose.Schema<productTypes>(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    adminId: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
    },
    currency: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProductSchema", productSchema);
