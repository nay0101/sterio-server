const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ratingSchema = new Schema(
  {
    film_id: {
      type: mongoose.ObjectId,
      required: true,
    },
    user_id: {
      type: mongoose.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Rating = model("Ratings", ratingSchema);
module.exports = Rating;
