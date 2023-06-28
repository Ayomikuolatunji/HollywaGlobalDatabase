import mongoose, { Document, Schema } from 'mongoose';

interface AdminModel {
  password: string;
  username: string;
  email?: string;
}

interface AdminDocument extends AdminModel, Document {}

const adminSchema = new Schema<AdminDocument>(
  {
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

const AdminModel = mongoose.model<AdminDocument>('adminModel', adminSchema);

export default AdminModel;
