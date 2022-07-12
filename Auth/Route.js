const express = require("express");

const router = express.Router();

// routes functions
const { register, login, update, deleteUser } = require("./Auth");

// route list
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(update);
router.route("/deleteUser").delete(deleteUser);

module.exports = router;
