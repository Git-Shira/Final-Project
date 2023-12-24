const express = require("express");
const app = express();
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cors = require("cors");
app.use(express.json());

app.use(cors()); // Use this after the variable declara
connectDB();
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
