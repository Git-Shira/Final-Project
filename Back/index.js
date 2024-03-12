const express = require("express");
const app = express();

const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require('./routes/cart');

const cors = require("cors");
app.use(express.json());

app.use(cors());
connectDB();
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));