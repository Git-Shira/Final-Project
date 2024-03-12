const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: String,
  fullName: String,
  totalPrice: Number,

  branch: String,

  typeCollect: String,
  street: String,
  city: String,

  typePay: String,

  date: String,

  products: [
    {
      name: String,
      price: Number,

      quantity: Number,
      totalPrice: Number,
    },
  ],

  comments:String,
});

module.exports = mongoose.model("Cart", CartSchema);