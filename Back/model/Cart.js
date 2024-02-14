const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: String,
  fullName: String,
  totaPrice: Number,

  typeCollect: String,
  street: String,
  city: String,

  typePay: String,
  products: [
    {
      name: String,
      price: Number,

      quantity: Number,
      totalPrice: Number,
    },
  ],
  date: String,

});

module.exports = mongoose.model("Cart", CartSchema);
