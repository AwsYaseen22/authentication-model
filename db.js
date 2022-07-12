const Mongoose = require("mongoose");
require("dotenv").config();
// console.log(process.env);
const remoteDB = process.env.DB_CONNECTION;
const connectDB = async () => {
  await Mongoose.connect(remoteDB).then((client) => {
    console.log("Connected to MongoDB successfully");
  });
};

module.exports = connectDB;
