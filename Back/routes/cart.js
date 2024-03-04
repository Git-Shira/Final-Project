const Cart = require("../model/Cart");
const express = require("express");
const User = require("../model/User");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    await newCart.save();

    res.status(200).send({ message: "Cart added successfully", cart: newCart });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.post("/user/:id/new_order", async (req, res) => {
  const id = req.params.id;

  if (id) {
    try {
      const cart = await User.findOne({ _id: id }); // Use _id instead of id

      if (!cart) {
        return res.status(400).send({ error: "Cart does not exist" });
      }
      const orderData = req.body;

      const newOrder = new Cart({
        userId: orderData.userId,
        fullName: orderData.fullName, // Extract other relevant fields from orderData
        totalPrice: orderData.totalPrice,
        typeCollect:orderData.typeCollect,
        street: orderData.street,
        city: orderData.city,
        typePay:orderData.typePay,
        products: orderData.products, // Assuming products are in the correct format
        date: orderData.date,
      });
      await newOrder.save();
      res
        .status(200)
        .send({ message: "Order creact successfully", cart: cart });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Something went wrong" });
    }
  }
});

router.get("/all", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).send({ message: "All carts", carts: carts });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.get("/user/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const cart = await Cart.findOne({ email: email }); // Use _id instead of id
    if (!cart) {
      return res.status(400).send({ error: "Cart does not exist" });
    }
    res.status(200).send({ message: "Cart", cart: cart });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.get("/user/:id/getOrders", async (req, res) => {
  const userId = req.params.id; // Use req.params.id to get the provided user ID
  console.log("get user", id);

  try {
      const cart = await Cart.findOne({ userId: userId }); // Compare userId with userId
      if (!cart) {
        return res.status(400).send({ error: "Cart does not exist" });
      }
      res.status(200).send({ message: "Cart", cart: cart });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Something went wrong" });
    }
});

module.exports = router;