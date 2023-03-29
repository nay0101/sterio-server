const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const subscriptionSchema = new Schema(
  {
    user_id: {
      type: mongoose.ObjectId,
      required: true,
    },
    subscription_duration: {
      type: Number,
      required: true,
    },
    subscription_status: {
      type: String,
      required: true,
    },
    subscription_fees: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Subscription = model("Subscriptions", subscriptionSchema);
module.exports = Subscription;
