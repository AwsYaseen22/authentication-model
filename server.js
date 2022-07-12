const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const connectDB = require("./db");

connectDB();

app.use(express.json());
app.use("/api/Auth", require("./Auth/Route"));

const server = app.listen(PORT, () => {
  console.log(`Connected to the sever successfully! port:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`An error occured: ${err.message}`);
  server.close(() => process.exit(1));
});
