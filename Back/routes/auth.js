const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({ error: "User already exists" });
    }
    user = new User({
      fullName,
      email,
      password,
      permission: "user",
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(200).send({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid credentials" });
    }
    res.send({ user: user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});
router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  console.log("get user", id);

  try {
    const user = await User.findOne({ _id: id }); // Use _id instead of id
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }
    res.status(200).send({ user: user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    const user = await UserSchema.findByIdAndUpdate(id, update);
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }
    if (user) {
      return res
        .status(200)
        .send({ message: "User updated successfully", user: user });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

module.exports = router;
