const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("MongoDb Connect Failed: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
