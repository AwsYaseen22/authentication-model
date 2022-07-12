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

exports.update = async (req, res, next) => {
  const { role, id } = req.body;
  if (role && id) {
    if (role === "Admin") {
      try {
        const user = await User.findById(id);
        user.role = user.role === "Basic" ? "Admin" : "Basic";
        await user.save();
        res.status(201).json({ message: "changed successfully", user });
      } catch (error) {
        res.status(400).json({ message: "check user id" }, error);
        process.exit(1);
      }
    } else {
      res.status(400).json({
        message: "You dont have this privelage!",
      });
    }
  } else {
    res.status(400).json({ message: "your role or id is messing" });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { role, id } = req.body;
  if (role && id) {
    if (role === "Admin") {
      let user = await User.findByIdAndDelete(id);
      if (user) {
        res.status(201).json({ message: "user deleted successfully: ", user });
      } else {
        res.status(400).json({
          message: "user not found",
        });
      }
    } else {
      res
        .status(400)
        .json({ message: "you dont have this previlage to delete a user!" });
    }
  } else {
    res.status(400).json({
      message:
        "your role and the id of the user you want to delete is required!",
    });
  }
};
