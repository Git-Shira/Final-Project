const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      // "mongodb+srv://haravot0:VjM8b01RgUMQyHyF@cluster0.s7go3yv.mongodb.net/?retryWrites=true&w=majority",
      // "mongodb+srv://shirae447:uWBmAgMoq1quSpkV@cluster0.w4ami0z.mongodb.net/?retryWrites=true&w=majority",
      "mongodb+srv://haravot0:VjM8b01RgUMQyHyF@cluster0.s7go3yv.mongodb.net/?retryWrites=true&w=majority",

      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("MongoDB connection SUCCESS");
  } catch (err) {
    console.error("MongoDB connection FAIL");
    process.exit(1);
  }
};
module.exports = connectDB;
