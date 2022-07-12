const express = require("express");

const router = express.Router();

// routes functions
const { register } = require("./Auth");

// route list
router.route("/register").post(register);

module.exports = router;
