import mongoose, { Document, Schema, Model } from 'mongoose';

interface AdminModel extends Document{
  password: string;
  username: string;
  email?: string;
}

interface AdminemailTaken extends Model<AdminModel> {
  emailTaken: (email: string) => Promise<boolean>;
}

const adminSchema = new Schema<AdminModel, AdminemailTaken>(
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

adminSchema.statics.emailTaken = async function (email: string) {
  const admin = await this.findOne({ email });
  return !!admin;
};

export const Admin: AdminemailTaken = mongoose.model<AdminModel, AdminemailTaken>('admin', adminSchema);

