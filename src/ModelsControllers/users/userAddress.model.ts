import mongoose from "mongoose";

const userAddressModel = new mongoose.Schema({
  address_line1: {
    type: String,
    require: true,
  },
  address_line2: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  postal_code: {
    type: Number,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  telephone: {
    type: Number,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchemas",
  },
});

export default mongoose.model("userAddressModel", userAddressModel);
