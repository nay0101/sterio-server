const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const filmSchema = new Schema(
  {
    film_name: {
      type: String,
      required: true,
    },
    film_description: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    casts: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Film = model("Films", filmSchema);
module.exports = Film;
