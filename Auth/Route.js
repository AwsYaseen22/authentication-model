const express = require("express");

const router = express.Router();

// routes functions
const { register, login, update } = require("./Auth");

// route list
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(update);

module.exports = router;
