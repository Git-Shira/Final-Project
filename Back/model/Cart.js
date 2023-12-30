const mongoose = require("mongoose");
const ProductSchema = require("./Product");
const UserSchema = require("./User");

const CartSchema = new mongoose.Schema({
  fullName: String,
  totaPrice: Number,
  user: UserSchema,
  products: [ProductSchema],
});
module.exports = mongoose.model("Product", CartSchema);
