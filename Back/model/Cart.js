const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: String,
  fullName: String,
  totaPrice: Number,

  fullAddress: String,
  city: String,
  products: [
    {
      name: String,
      price: Number,

      quantity: Number,
      totalPrice: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
