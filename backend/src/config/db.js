require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;

const connectToDb = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to database sucessfully");
  } catch (error) {
    console.log(error, "Error while connecting to database");
  }
};

module.exports = connectToDb;
