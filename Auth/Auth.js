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
