import mongoose from "mongoose";


const userPaymentModel = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  payment_type: {
    type: String,
    require: true,
  },
  card_number: {
    type: Number,
    require: true,
  },
  card_expiry_date: {
    type: Date,
    require: true,
  },
  card_cvv: {
    type: Number,
    require: true,
  },
  card_holder_name: {
    type: String,
    require: true,
  },
});

export default mongoose.model("userPaymentCardSchema", userPaymentModel);
