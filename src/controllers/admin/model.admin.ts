import mongoose from "mongoose";
import { adminModelTypings } from "../../typings/ModelTypings";

const newAdmin = new mongoose.Schema<adminModelTypings>(
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
