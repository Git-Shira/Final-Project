const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  amount: Number,
  image: String,
  category: String,
  filter:String
});

module.exports = mongoose.model("Product", ProductSchema);