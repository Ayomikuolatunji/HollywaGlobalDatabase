import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
});

export default mongoose.model("ProductSchema", productSchema);
