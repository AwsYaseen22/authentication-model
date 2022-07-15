const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
const { adminAuth, userAuth } = require("./Auth/verifyToken");

// Use ejs template
app.set("view engine", "ejs");

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/Auth", require("./Auth/Route"));

// public routes
app.get("/", (req, res) => res.render("home"));
app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => res.render("login"));
app.get("/logout", (req, res) => {
  res.header("auth-token", "");
  res.redirect("/");
});

// protect these routes for admins and basic users
app.get("/admin", (req, res) => res.render("admin"));
app.get("/basic", userAuth, (req, res) => res.render("user"));

const server = app.listen(PORT, () => {
  console.log(`Connected to the sever successfully! port:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`An error occured: ${err.message}`);
  server.close(() => process.exit(1));
});
