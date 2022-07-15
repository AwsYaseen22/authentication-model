const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const verifyToken = require("./verifyToken");

// create a secret by using in node:
// require('crypto').randomBytes(35).toString('hex')

// Generate token
function generateToken(user) {
  const maxAge = 3 * 60 * 60;
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: maxAge }
  );
  return token;
}

exports.register = async (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be 6 characters or more" });
  }
  try {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    let user = await User.create({
      username,
      password: hash,
    });
    if (user) {
      //   create and assign token
      const token = generateToken(user);
      const maxAge = 3 * 60 * 60;
      //   res.cookie = ("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      //   res.header("auth-token", token);
      res
        .status(200)
        .cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
        .json({ message: "User succeffully created!", user });
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "User did not created", error: error.message });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  //   console.log("1111111111", username, password);
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  try {
    const user = await User.findOne({
      username,
    });
    // console.log("2222222", { user });
    if (!user) {
      res.status(401).json({
        message: "Check username and password!",
        error: "user not found",
      });
    } else {
      const logged = await bcrypt.compare(password, user.password);

      //   create and assign token
      const token = generateToken(user);
      //   console.log("3333333", token);
      if (logged) {
        const maxAge = 3 * 60 * 60;
        // res.cookie = ("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        // console.log("res.cookie: ", res);
        // res.header("auth-token", token);
        res
          .status(200)
          .cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
          .json({
            message: "Loged in successfully",
            user,
          });
      } else {
        throw "no match";
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "No match",
      error: error.message,
    });
  }
};

exports.update = async (req, res, next) => {
  const { role, id } = req.body;
  console.log({ role, id });
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

exports.getUsers = async (req, res, next) => {
  //   console.log("reaaaaaaaached here");
  try {
    const users = await User.find({});
    const usersList = users.map((user) => {
      return {
        id: user._id,
        username: user.username,
        role: user.role,
      };
    });
    res.status(200).json({ user: usersList });
  } catch (err) {
    res.status(401).json({ message: "Not successfull", error: err.message });
  }
};
