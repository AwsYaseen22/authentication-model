const express = require("express");

const router = express.Router();

// routes functions
const { register, login, update, deleteUser } = require("./Auth");
const { adminAuth } = require("./verifyToken");
// route list
router.route("/register").post(register);
router.route("/login").post(login);

// protect the following routes to admin only
router.route("/update").put(adminAuth, update);
router.route("/deleteUser").delete(adminAuth, deleteUser);

module.exports = router;
