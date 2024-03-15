const express = require("express");
const router = express.Router();
const ProductSchema = require("../model/Product");

router.post("/add", async (req, res) => {
  try {
    const newProudct = new ProductSchema(req.body);
    await newProudct.save();

    res.status(200).send({ message: "Product added successfully", product: newProudct });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const products = await ProductSchema.find();
    res.status(200).send({ message: "All products", products: products });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductSchema.findById(id);
    if (!product) {
      return res.status(400).send({ error: "Product does not exist" });
    }
    res.status(200).send({ message: "Product", product: product });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    const product = await ProductSchema.findByIdAndUpdate(id, update);
    if (!product) {
      return res.status(400).send({ error: "Product does not exist" });
    }
    res.status(200).send({ message: "Product updated successfully", product: product });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductSchema.findByIdAndDelete(id);
    if (!product) {
      return res.status(400).send({ error: "Product does not exist" });
    }
    res.status(200).send({ message: "Product deleted successfully", product: product });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

module.exports = router;