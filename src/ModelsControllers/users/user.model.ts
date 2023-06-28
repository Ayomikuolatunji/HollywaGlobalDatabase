import mongoose from 'mongoose';
import { userModelTypes } from '../../types/ModelTypings';

const userModel = new mongoose.Schema<userModelTypes>(
  {
    first_name: {
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
    last_name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<userModelTypes>('userSchemas', userModel);
