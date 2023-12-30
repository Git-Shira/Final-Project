const Cart = require("../modal/Cart");
const express = require("express");

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
  console.log("get user", email);

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

router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  console.log("get user", id);
  if (id) {
    try {
      const cart = await Cart.findOne({ id: id }); // Use _id instead of id
      if (!cart) {
        return res.status(400).send({ error: "Cart does not exist" });
      }
      res.status(200).send({ message: "Cart", cart: cart });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Something went wrong" });
    }
  }
});
