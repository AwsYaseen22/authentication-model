const express = require("express");
const app = express();
const PORT = process.env.PORT;
const connectDB = require("./db");

connectDB();
const server = app.listen(PORT, () => {
  console.log("Connected to the sever successfully!");
});

process.on("unhandledRejection", (err) => {
  console.log(`An error occured: ${err.message}`);
  server.close(() => process.exit(1));
});
