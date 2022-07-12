const User = require("../model/User");

exports.register = async (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be 6 characters or more" });
  }
  try {
    let user = await User.create({
      username,
      password,
    });
    if (user) {
      res.status(200).json({ message: "User succeffully created!", user });
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "User did not created", error: error.message });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(401).json({
        message: "Check username and password!",
        error: "user not found",
      });
    } else {
      res.status(200).json({
        message: "Loged in successfully",
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "error occured",
      error: error.message,
    });
  }
};
