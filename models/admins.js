const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = model("Admins", adminSchema);
module.exports = Admin;
