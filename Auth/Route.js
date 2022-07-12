const express = require("express");

const router = express.Router();

// routes functions
const { register, login } = require("./Auth");

// route list
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
