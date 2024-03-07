const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { fullName, date, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({ error: "User already exists" });
    }
    user = new User({
      fullName,
      email,
      date,
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
  console.log("login");
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(405).send({ error: "Invalid credentials" });
    }
    res.status(200).send({ user: user });
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
    // Include the password in the response (for demonstration purposes only)
    const userWithPassword = { ...user.toObject(), password: user.password };
    res.status(200).send({ user: userWithPassword });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});
const saltRounds = 10; // You can adjust the salt rounds based on security requirements

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}
router.put("/update/:id", async (req, res) => {
  console.log("update user");
  try {
    const id = req.params.id;
    const update = req.body;
    console.log("update", update);
    console.log("id", id);

    // If updating password, hash it before updating (implement hashPassword function)
    if (update.password) {
     update.password = await hashPassword(update.password);
    }

    const user = await User.findByIdAndUpdate(id, update, { new: true });
    if (!user) {
      return res.status(404).send({ error: "User does not exist" });
    }
    
    return res.status(200).send({
      message: "User updated successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.get("/user/id/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }
    res.status(200).send({ userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.post("/forgot_password", async (req, res) => {
  const { email, date, newPassword } = req.body;
  console.log("forgot password", email, date, newPassword);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }
    if (user.date !== date) {
      return res.status(405).send({ error: "Invalid date" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.status(200).send({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ message: "All users", users: users });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

module.exports = router;

