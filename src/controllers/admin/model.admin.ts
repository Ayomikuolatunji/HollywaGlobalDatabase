import mongoose from "mongoose";

const newAdmin = new mongoose.Schema(
  {
    password: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("adminModel", newAdmin);
