const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const librarySchema = new Schema(
  {
    film_id: {
      type: mongoose.ObjectId,
      required: true,
    },
    user_id: {
      type: mongoose.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Library = model("Library", librarySchema);
module.exports = Library;
