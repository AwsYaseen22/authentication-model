const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
const { adminAuth, userAuth } = require("./Auth/verifyToken");

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/Auth", require("./Auth/Route"));

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", adminAuth, (req, res) => res.send("Basic User Route"));

const server = app.listen(PORT, () => {
  console.log(`Connected to the sever successfully! port:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`An error occured: ${err.message}`);
  server.close(() => process.exit(1));
});
