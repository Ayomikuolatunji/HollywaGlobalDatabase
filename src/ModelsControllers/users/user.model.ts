import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    full_name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("userSchemas", userModel);
